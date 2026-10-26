import UserCard from '../Utils/UserCard';
import { IoVideocamOutline } from 'react-icons/io5';
import { MdMoreVert } from 'react-icons/md';

function ChatNav() {
  return (
    <div className="flex items-center justify-between shrink-0 gap-2 bg-[#1A1628] border-b border-[#2C2640]">
      <div className="min-w-0 flex-1">
        <UserCard userName="Priya Shah" />
      </div>
      <div className="flex items-center shrink-0 gap-3 px-3 sm:gap-5 sm:px-6">
        <IoVideocamOutline size={25} className="text-slate-600" />
        <MdMoreVert size={25} className="text-slate-600" />
      </div>
    </div>
  );
}

export default ChatNav;
