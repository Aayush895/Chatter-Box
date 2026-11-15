import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReceiverId,
  getSenderId,
  getReceiverName,
  showMessageComponent,
} from '../../../Slices/messagesSlice';

import { getInitials } from '../../../../utitlity';

function UserCard({ avatarUrl = '', friendUserName, friendUserId, userId }) {
  const [isUserOnline, set_isUserOnline] = useState(true);
  const dispatch = useDispatch();
  const initials = getInitials(friendUserName);

  const selectedReceiverId = useSelector((state) => state.messages.receiverId);
  const isSelected = selectedReceiverId?.payload === friendUserId;

  function handleReceiverInfo() {
    dispatch(showMessageComponent());
    dispatch(getReceiverId(friendUserId));
    dispatch(getSenderId(userId));
    dispatch(getReceiverName(friendUserName));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      set_isUserOnline(true);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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
        {isUserOnline ? (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#5EEAD4] border-2 border-[#1A1628]" />
        ) : (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-slate-500 border-2 border-[#1A1628]" />
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
