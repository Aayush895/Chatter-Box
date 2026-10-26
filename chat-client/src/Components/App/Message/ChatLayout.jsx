import ChatBody from './ChatBody';
import ChatNav from './ChatNav';
import ChatInput from './ChatInput';

function ChatLayout() {
  return (
    <div className="flex flex-col w-full h-dvh">
      <ChatNav />
      <div className="flex-1 min-h-0">
        <ChatBody />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatLayout;
