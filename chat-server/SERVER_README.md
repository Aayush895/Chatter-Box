# Live Friend Request Notifications — Design Notes

## What I was trying to build

When someone sends me a friend request, I want to find out about it
immediately — without needing to manually refresh or reopen the
notifications panel. I also want an unread count badge on the
notification icon that goes up the moment a new request arrives, and
resets once I've actually looked at it.

Plain REST (`GET /requests`) can't do this on its own, because a GET
only returns data when the client asks for it. There's no way for my
server to reach out to a browser tab that isn't currently asking it
anything. That's the actual reason WebSockets are needed here — not
because REST is "slow," but because REST has no mechanism for the
server to speak first.

## The core idea: rooms, not a manual map

My first instinct was to keep a manual lookup — a `Map` of
`username → socket_id` — so the server would know which socket
belongs to which person. This breaks the moment someone opens a
second tab: a `Map` only holds one value per key, so the second
connection silently overwrites the first, and the first tab stops
getting notified while looking perfectly "online."

Socket.io's **rooms** solve this natively. A room can hold many
sockets at once, so instead of a hand-rolled map, every user's
socket just joins a room named after their own stable `user_id`:

```js
socket.join(`user:${userId}`);
```

Whenever the server wants to notify that person — on any device,
any tab — it targets that one room:

```js
io.to(`user:${userId}`).emit('friend-request:received', payload);
```

**Important gotcha:** the room name string has to match
_character-for-character_ everywhere it's used (`user:123`, not
`User: 123` or `user: 123`). A mismatched room name doesn't throw an
error — the event just silently goes to nobody.

## Why the room key is `user_id`, never `socket_id`

A `socket_id` is regenerated on every reconnect — a page refresh, a
network blip, closing and reopening a tab all produce a new one.
`user_id` is stable for as long as the account exists. Using
`socket_id` as a room name would mean re-deriving and re-syncing the
room name constantly; using `user_id` means joining once per
connection and never worrying about it again.

## How identity gets from login into the socket

There's no direct link between an HTTP route and a socket
connection — they're separate connections that both happen to need
to answer "who is this?" The flow:

1. The client already holds a JWT access token from logging in
   (the same one used for authenticated REST calls).
2. When the client opens a socket connection, it sends that same
   token again, via `socket.handshake.auth.accessToken` — not a
   header, since sockets don't have HTTP headers in the request
   sense.
3. A Socket.io middleware (`io.use(...)`) runs once, before the
   `connection` event fires, and verifies that token the same way
   the existing `jwtAuthMiddleware` verifies it for REST — same
   `jwt.verify()` call, same secret, just reading the token from a
   different place.
4. On success, the decoded payload is attached to the socket
   (`socket.userInfo`), and every later event on that socket can
   read it without re-verifying.

Kept deliberately simple: if both tokens are expired, the user gets
redirected to login anyway by the existing app logic, so the socket
middleware doesn't try to replicate the access/refresh-token
fallback dance — it just verifies the access token and rejects the
connection if that fails.

## Where the actual notification gets triggered

The friend-request `POST` route is the **only** place a request gets
created — not a socket event. The socket emit is a side effect that
happens _after_ the database write succeeds, not a parallel path a
button click triggers directly. This avoids a race where a socket
event could fire even if the POST itself failed.

```
Client clicks "Add friend"
        │
        ▼
POST /api/request  (creates the FriendRequest row)
        │
        ▼
Server emits `friend-request:received`
   to `user:<receiverId>`'s room
        │
        ▼
Receiver's badge count increments live,
even if their notification panel is closed
```

The sender's own "request sent" confirmation doesn't need a socket
event at all — the POST's HTTP response already answers that
directly.

## Unread count logic

- The count lives in client state (e.g. Redux), incremented every
  time a `friend-request:received` event arrives — independent of
  whether the notifications panel is open.
- Opening the panel triggers the existing `GET /requests` call (to
  show the actual list) and also resets the count to zero.
- Not yet solved: the reset above only lives in client memory. A
  page refresh right after "reading" a notification would bring the
  old count back, since the server doesn't know anything was read.
  Fixing this properly needs a persisted `last_read_at` timestamp,
  with the badge count computed as "pending requests created after
  that timestamp" — left as a future improvement, not done yet.

## Where this connects to future chat rooms

Once messaging is built, each 1:1 conversation will get its own
room, separate from the per-user notification room — built the same
day the two users first start chatting, not upfront. To avoid two
users computing two different room names for the same conversation,
the room name will be built from both user IDs in a fixed sort
order:

```js
function getChatRoomId(userIdA, userIdB) {
  const [a, b] = [userIdA, userIdB].sort((x, y) => x - y);
  return `chat:${a}_${b}`;
}
```

This way it doesn't matter who initiates — both clients land in the
same room.

## Still to double-check

- Confirm the actual field name on the decoded JWT payload
  (`userInfo.userId` vs `.id` vs `.sub`) — this has to match exactly
  what `generateAccessToken` signs into the token, and hasn't been
  verified against real token output yet.
- Make sure `io` is reachable from the friend-request controller
  (e.g. via `app.set('io', io)` in `server.js`, then
  `req.app.get('io')` inside the controller) — right now `io` is
  scoped locally to the socket setup file.
