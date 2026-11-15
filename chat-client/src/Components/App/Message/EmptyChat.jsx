import { IoIosChatbubbles } from 'react-icons/io';

function EmptyChat() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6">
      <div className="w-14 h-14 rounded-full bg-[#241E38] flex items-center justify-center mb-4">
        <IoIosChatbubbles className="text-2xl text-[#FF6B4D]" />
      </div>
      <p className="font-['Fraunces',serif] italic font-semibold text-xl text-[#F3F1F7] mb-1">
        No messages yet
      </p>
      <p className="text-sm text-slate-400 max-w-xs">
        This is the start of your conversation. Say hello and break the ice.
      </p>
    </div>
  );
}

export default EmptyChat;
