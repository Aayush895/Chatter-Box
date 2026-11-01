import { useDispatch } from 'react-redux';
import {
  getReceiverId,
  getSenderId,
  showMessageComponent,
} from '../../../Slices/messagesSlice';

import { getInitials } from '../../../../utitlity';

// TODO: Need to fix a bug where the name of the user in the chat layout is undefined
function UserCard({ avatarUrl = '', friendUserName, friendUserId, userId }) {
  const dispatch = useDispatch();
  console.log('LOGGING: ', friendUserName);
  const initials = getInitials(friendUserName);

  function handleReceiverInfo() {
    dispatch(showMessageComponent());
    dispatch(getReceiverId(friendUserId));
    dispatch(getSenderId(userId));
  }

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-[#241E38]"
      onClick={handleReceiverInfo}
    >
      <div className="relative shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={friendUserName}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#2C2640] flex items-center justify-center text-sm font-semibold text-slate-300">
            {initials}
          </div>
        )}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#5EEAD4] border-2 border-[#1A1628]" />
      </div>

      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-[#F3F1F7] truncate">
          {friendUserName}
        </p>
        <p className={`text-xs font-['JetBrains_Mono',monospace]`}></p>
      </div>
    </div>
  );
}

export default UserCard;
