import { useContext } from 'react';
import { useFetchPendingRequests } from '../../../Hooks/Queries/useFetchPendingRequests';
import UserContext from '../../../Context/UserContext';
import { IoMdCloseCircle } from 'react-icons/io';
import PendingRequests from './PendingRequests';

function Notification({ isVisible, onClose }) {
  const { userInfo } = useContext(UserContext);

  const { data, isLoading } = useFetchPendingRequests(userInfo.accessToken);
  return (
    <div
      className={`absolute top-16 left-3 right-3 z-50 origin-top-right border border-slate-600 rounded-3xl bg-[#1A1628] shadow-xl transition-all duration-200 ease-out h-100  ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex justify-between items-center border-b border-slate-600 p-3">
        <h1>Notifications</h1>
        <IoMdCloseCircle
          size={25}
          className="cursor-pointer hover:text-[#FF6B4D]"
          onClick={onClose}
        />
      </div>
      {isLoading ? (
        <span className="loading loading-bars loading-xl"></span>
      ) : (
        <PendingRequests pendingRequests={data?.data} />
      )}
    </div>
  );
}

export default Notification;
