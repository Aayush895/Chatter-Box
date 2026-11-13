import { BsEmojiNeutral } from 'react-icons/bs';

function EmptyFriendsList() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col overflow-y-auto">
      <div className="border border-[#2C2640] w-12.5 h-12.5 rounded-full mb-5 flex items-center justify-center bg-[#241E38] shrink-0">
        <BsEmojiNeutral className="text-slate-500" />
      </div>
      <div className="text-center px-4">
        <p className="text-gray-400">No conversations yet.</p>
        <p className="text-gray-400">Add someone to get started.</p>
      </div>
    </div>
  );
}

export default EmptyFriendsList;
