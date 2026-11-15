import { getInitials } from '../../../../utitlity';
import { IoVideocamOutline } from 'react-icons/io5';
import { MdMoreVert } from 'react-icons/md';
import { useSelector } from 'react-redux';

function ChatNav() {
  const receiverName = useSelector((state) => state.messages.receiverName);
  const initials = getInitials(receiverName);

  return (
    <div className="flex items-center justify-between shrink-0 gap-2 bg-[#1A1628] border-b border-[#2C2640]">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-[#241E38]">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full bg-[#2C2640] flex items-center justify-center text-sm font-semibold text-slate-300">
              {initials}
            </div>

            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#5EEAD4] border-2 border-[#1A1628]" />
          </div>

          <div className="min-w-0">
            <p className="text-[13.5px] font-medium text-[#F3F1F7] truncate">
              {receiverName}
            </p>
            <p className={`text-xs font-['JetBrains_Mono',monospace]`}></p>
          </div>
        </div>
      </div>
      <div className="flex items-center shrink-0 gap-3 px-3 sm:gap-5 sm:px-6">
        <IoVideocamOutline size={25} className="text-slate-600" />
        <MdMoreVert size={25} className="text-slate-600" />
      </div>
    </div>
  );
}

export default ChatNav;
