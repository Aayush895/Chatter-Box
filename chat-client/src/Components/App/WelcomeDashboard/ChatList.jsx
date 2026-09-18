import { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosSettings, IoIosNotifications } from 'react-icons/io';
import { BsEmojiNeutral } from 'react-icons/bs';
import UserContext from '../../../Context/UserContext';
import { showNotification, hideNotification } from '../../../Slices/notificationSlice';
import Notification from '../Notifications/Notification';

function ChatList() {
  const [isOnline, setOnline] = useState(() => {
    return navigator.onLine;
  });

  const { userInfo } = useContext(UserContext);
  const isNotificationVisible = useSelector((state) => {
    return state.pendingRequestsNotification.isNotificationVisible;
  });
  const dispatch = useDispatch();

  function handleShowNotification() {
    dispatch(showNotification());
  }

  function handleHideNotification() {
    dispatch(hideNotification());
  }

  useEffect(() => {
    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));

    return () => {
      window.removeEventListener('online', () => setOnline(true));
      window.removeEventListener('offline', () => setOnline(false));
    };
  });

  return (
    <div className="relative w-full md:w-[40%] lg:w-[35%] xl:w-[30%] h-screen border-r border-r-slate-800 px-5 py-2 bg-[#1A1628] flex flex-col">
      <div className="flex justify-between items-center mb-7">
        <div className="gap-2.5 flex items-center">
          <span className="text-[22px] text-[#FF6B4D] rotate-180 inline-block">◡</span>
          <span className="font-['Fraunces',serif] italic font-semibold text-2xl tracking-[-0.01em]">
            Wisp
          </span>
        </div>
        <div
          className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-[#241E38]"
          onClick={handleShowNotification}
        >
          <IoIosNotifications className="text-lg" />
        </div>
      </div>

      <Notification isVisible={isNotificationVisible} onClose={handleHideNotification} />

      <div className="w-full mb-10 shrink-0">
        <input
          type="text"
          placeholder="Search conversations"
          className="input w-full bg-transparent"
        />
      </div>

      <div className="flex-1 flex justify-center items-center flex-col overflow-y-auto">
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
            <p className="truncate">
              {userInfo.userName.charAt(0).toUpperCase() + userInfo.userName.slice(1)}
            </p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EEAD4] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EEAD4]" />
              </span>
              {isOnline ? (
                <p className="text-sm text-gray-400">Online</p>
              ) : (
                <p className="text-sm text-gray-400">Offline</p>
              )}
            </div>
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
