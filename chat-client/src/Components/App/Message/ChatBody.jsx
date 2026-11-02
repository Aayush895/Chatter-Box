import { useSelector } from 'react-redux';

function ChatBody() {
  const senderMessage = useSelector((state) => state.messages.sentMessage);
  const receiverMessage = useSelector((state) => state.messages.receivedMessage);
  return (
    <div className="h-full overflow-y-auto py-4 px-3 sm:px-4 bg-[#14111F]">
      <div className="chat chat-start">
        {receiverMessage && receiverMessage.length > 0 && (
          <div className="chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-break-word px-3.5 py-2 text-[15px] sm:text-base bg-[#241E38] text-[#F3F1F7] rounded-[18px_18px_18px_6px]">
            {receiverMessage}
          </div>
        )}
      </div>
      <div className="chat chat-end">
        {senderMessage && senderMessage.length > 0 && (
          <div className="chat-bubble before:hidden max-w-[80%] sm:max-w-[65%] wrap-break-word px-3.5 py-2 text-[15px] sm:text-base bg-[#FF6B4D] text-[#4A1B0C] rounded-[18px_18px_6px_18px]">
            {senderMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBody;
