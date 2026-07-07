function ChatBubble({ name, message, timeStamp, hasTypingStarted }) {
  const isMe = name === 'Alex';
  return (
    <div className={`chat ${isMe ? 'chat-start' : 'chat-end'}`}>
      <div className="chat-image avatar">
        <div className="w-8 sm:w-10 rounded-full">
          <img
            alt={`${name}'s avatar`}
            src={
              isMe
                ? 'https://img.daisyui.com/images/profile/demo/kenobee@192.webp'
                : 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp'
            }
          />
        </div>
      </div>
      <div className="chat-header text-[#9992AC] text-xs mb-1">
        {name} @
        <time className="text-xs">{timeStamp}</time>
      </div>
      <div
        className={`chat-bubble border-0 text-[13px] sm:text-[13.5px] font-light leading-relaxed max-w-[85%] sm:max-w-[75%] ${
          isMe ? 'bg-[#FF6B4D] text-[#2A1108] rounded-br-sm' : 'bg-[#241E38] text-[#F3F1F7] rounded-bl-sm'
        }`}
      >
        {hasTypingStarted === false ? (
          <span className="flex gap-1 items-center py-1">
            <span className="w-1.25 h-1.25 rounded-full bg-current opacity-55 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.25 h-1.25 rounded-full bg-current opacity-55 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.25 h-1.25 rounded-full bg-current opacity-55 animate-bounce" />
          </span>
        ) : (
          message
        )}
      </div>
    </div>
  );
}
export default ChatBubble;