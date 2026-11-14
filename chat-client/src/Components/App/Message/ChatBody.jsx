import { useSelector } from 'react-redux';
import PrevChatMessages from './PrevChatMessages';

function ChatBody({ userChats, senderId, receiverId }) {
  const liveMessages = useSelector((state) => state.messages.liveMessages);

  return (
    <div className="h-full overflow-y-auto py-4 px-3 sm:px-4 bg-[#14111F]">
      <PrevChatMessages userChats={userChats} sender={senderId} receiver={receiverId} />
      {liveMessages.map((message, idx) => {
        const isMine = message.from === 'me';
        return (
          <div className={`chat ${isMine ? 'chat-end' : 'chat-start'}`} key={idx}>
            <div
              className={`chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-anywhere px-3.5 py-2 text-[15px] sm:text-base ${
                isMine
                  ? 'bg-[#FF6B4D] text-[#4A1B0C] rounded-[18px_18px_6px_18px]'
                  : 'bg-[#3A3F4B] text-[#F1F3F5] rounded-[18px_18px_18px_6px]'
              }`}
            >
              {message.messageContent}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBody;
