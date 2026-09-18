import { useContext } from 'react';
import { useFetchPendingRequests } from '../../../Hooks/Queries/useFetchPendingRequests';
import UserContext from '../../../Context/UserContext';
import { IoMdCloseCircle } from 'react-icons/io';
import { HiMiniUserPlus } from 'react-icons/hi2';

function Notification({ isVisible, onClose }) {
  const { userInfo } = useContext(UserContext);

  const { data } = useFetchPendingRequests(userInfo.accessToken);
  console.log(data);
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

      <ul className="list-none">
        {data?.data?.map((requester) => {
          return (
            <li key={requester.id}>
              <div className="px-5 flex border-b border-slate-600 items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-orange-900">
                  <HiMiniUserPlus className="text-[#FF6B4D]" size={25} />
                </div>
                <div className="flex flex-col gap-3 my-5 mx-5">
                  <h1>
                    <span className="font-extrabold">
                      {requester.requester.userName.charAt(0).toUpperCase() +
                        requester.requester.userName.slice(1)}
                    </span>{' '}
                    wants to connect
                  </h1>
                  <div className="flex justify-between items-center">
                    <button className="border-0 bg-[#FF6B4D] hover:opacity-90 text-[#2A1108] rounded-[7px] font-bold text-[14.5px] normal-case w-[45%] h-8 cursor-pointer">
                      Accept
                    </button>
                    <button className="w-[45%] bg-transparent text-white border border-[#2C2640] hover:bg-[#241E38] transition-colors duration-200 rounded-[7px] text-[14.5px] h-8 normal-case font-bold cursor-pointer">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Notification;
