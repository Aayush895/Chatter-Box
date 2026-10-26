import { RiAttachment2 } from 'react-icons/ri';
import { IoIosSend } from 'react-icons/io';

function ChatInput() {
  return (
    <div className="flex items-center shrink-0 gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-3.5 bg-[#1A1628] border-t border-[#2C2640] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        aria-label="Attach file"
        className="shrink-0 p-1 text-[#6B6480] hover:text-[#F3F1F7] cursor-pointer"
      >
        <RiAttachment2 size={20} />
      </button>
      <input
        type="text"
        placeholder="Type here"
        className="input flex-1 min-w-0 bg-[#14111F] border border-[#2C2640] rounded-[10px] text-[#F3F1F7] placeholder:text-[#6B6480]"
      />
      <button
        type="button"
        aria-label="Send message"
        className="btn btn-square shrink-0 bg-[#FF6B4D] text-[#4A1B0C] w-8.5 h-8.5 rounded-[10px] flex items-center justify-center hover:opacity-90"
      >
        <IoIosSend size={25} />
      </button>
    </div>
  );
}

export default ChatInput;
