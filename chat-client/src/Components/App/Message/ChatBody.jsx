import { useSelector } from 'react-redux';

function ChatBody() {
  const senderMessage = useSelector((state) => state.messages.sentMessage);
  const receiverMessage = useSelector((state) => state.messages.receivedMessage);

  console.log('LOGGING sendermessage: ', senderMessage);
  return (
    <div className="h-full overflow-y-auto py-4 px-3 sm:px-4 bg-[#14111F]">
      {receiverMessage &&
        receiverMessage.length > 0 &&
        receiverMessage.map((receivedMessage, idx) => {
          return (
            <div className="chat chat-start" key={idx}>
              <div className="chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-break-word px-3.5 py-2 text-[15px] sm:text-base bg-[#FF6B4D] text-[#4A1B0C] rounded-[18px_18px_6px_18px]">
                {receivedMessage}
              </div>
            </div>
          );
        })}
      {senderMessage &&
        senderMessage.length > 0 &&
        senderMessage.map((sentMessage, idx) => {
          return (
            <div className="chat chat-end" key={idx}>
              <div className="chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-break-word px-3.5 py-2 text-[15px] sm:text-base bg-[#FF6B4D] text-[#4A1B0C] rounded-[18px_18px_6px_18px]">
                {sentMessage}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ChatBody;
