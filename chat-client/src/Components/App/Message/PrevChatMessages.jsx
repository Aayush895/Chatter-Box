import { getHowMuchTimePassed } from '../../../../utitlity';

// TODO: Need to figure out a way where time is getting updated live after every minute
function PrevChatMessages({ userChats, sender }) {
  const sortedChats =
    userChats &&
    userChats.data.length > 0 &&
    userChats.data?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return (
    <>
      {sortedChats?.length > 0 &&
        sortedChats.map((chat) => {
          return chat.senderId == sender.payload ? (
            <div className="chat chat-end" key={chat.id}>
              <div className="chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-anywhere px-3.5 py-2 text-[15px] sm:text-base bg-[#FF6B4D] text-[#4A1B0C] rounded-[18px_18px_6px_18px]">
                {chat.content}
              </div>
              <time className="text-xs chat-footer opacity-50 mt-1.5">
                {getHowMuchTimePassed(chat.createdAt)}
              </time>
            </div>
          ) : (
            <div className="chat chat-start" key={chat.id}>
              <div className="chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-anywhere px-3.5 py-2 text-[15px] sm:text-base bg-[#3A3F4B] text-[#F1F3F5] rounded-[18px_18px_18px_6px]">
                {chat.content}
              </div>
              <time className="text-xs chat-footer opacity-50 mt-1.5">
                {getHowMuchTimePassed(chat.createdAt)}
              </time>
            </div>
          );
        })}
    </>
  );
}

export default PrevChatMessages;
