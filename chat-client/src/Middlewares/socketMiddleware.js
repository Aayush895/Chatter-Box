import { io } from 'socket.io-client';

export function socketMiddleware(url) {
  return (storeApi) => {
    let socket = null;

    return (next) => (action) => {
      switch (action.type) {
        case 'socket/connect': {
          if (socket) break;

          socket = io(url, {
            auth: {
              accessToken: action.payload,
            },
          });

          socket?.on('friend-request:received', (data) => {
            storeApi.dispatch({
              type: 'notifications/getIncomingRequestData',
              payload: data,
            });
          });

          socket?.on('request-status', (data) => {
            console.log(data);
          });

          break;
        }

        case 'socket/disconnect': {
          socket?.disconnect();
          socket = null;
          break;
        }

        // Similarly, if you want to emit any action from client side add it in case

        // TODO: Need to test it once implemented it properly with client
        case 'friend-request:accept': {
          socket?.emit('friend-request:accept', action.payload);
          break;
        }
      }

      next(action);
    };
  };
}
