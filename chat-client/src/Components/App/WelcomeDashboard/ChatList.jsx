import { FaEdit } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { BsEmojiNeutral } from 'react-icons/bs';

function ChatList() {
  return (
    <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] h-screen border-r border-r-slate-800 px-5 py-2 bg-[#1A1628] flex flex-col">
      <div className="flex justify-between items-center mb-7">
        <div className="gap-2.5 flex items-center">
          <span className="text-[22px] text-[#FF6B4D] rotate-180 inline-block">◡</span>
          <span className="font-['Fraunces',serif] italic font-semibold text-2xl tracking-[-0.01em]">
            Wisp
          </span>
        </div>
        <div className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-[#241E38]">
          <FaEdit className="text-lg" />
        </div>
      </div>

      <div className="w-full mb-10 shrink-0">
        <input
          type="text"
          placeholder="Search conversations"
          className="input w-full bg-transparent"
        />
      </div>

      <div className="flex-1 flex justify-center items-center flex-col overflow-y-auto">
        {/*For now we don't have any data, once we get data about other users we will create another component which shows friends list data */}

        <div className="border border-[#2C2640] w-12.5 h-12.5 rounded-full mb-5 flex items-center justify-center bg-[#241E38] shrink-0">
          <BsEmojiNeutral className="text-slate-500" />
        </div>
        <div className="text-center px-4">
          <p className="text-gray-400">No conversations yet.</p>
          <p className="text-gray-400">Add someone to get started.</p>
        </div>
      </div>

      <div className="flex justify-between items-center shrink-0 py-2">
        <div className="flex items-center min-w-0">
          <div className="border border-[#2C2640] w-17.5 h-17.5 rounded-full flex items-center justify-center shrink-0 text-xs text-center leading-none">
            Photo
          </div>
          <div className="ml-5 min-w-0">
            <p className="truncate">Test</p>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <div className="p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#241E38]">
          <IoIosSettings className="text-lg shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default ChatList;
