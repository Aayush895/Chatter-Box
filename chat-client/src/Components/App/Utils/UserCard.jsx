import { useDispatch, useSelector } from 'react-redux';
import {
  getReceiverId,
  getSenderId,
  getReceiverName,
  showMessageComponent,
} from '../../../Slices/messagesSlice';

import { getInitials } from '../../../../utitlity';

function UserCard({ avatarUrl = '', friendUserName, friendUserId, userId }) {
  const dispatch = useDispatch();
  const initials = getInitials(friendUserName);

  const selectedReceiverId = useSelector((state) => state.messages.receiverId);
  const isSelected = selectedReceiverId === friendUserId;

  function handleReceiverInfo() {
    dispatch(showMessageComponent());
    dispatch(getReceiverId(friendUserId));
    dispatch(getSenderId(userId));
    dispatch(getReceiverName(friendUserName));
  }

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-[#241E38]' : ''} hover:bg-[#241E38]`}
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
