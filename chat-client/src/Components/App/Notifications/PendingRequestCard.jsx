import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { HiMiniUserPlus } from 'react-icons/hi2';
import { hideNotification } from '../../../Slices/notificationSlice';
import { useFetchFriendsList } from '../../../Hooks/Queries/useFetchFriendsList';
import UserContext from '../../../Context/UserContext';

function PendingRequestCard({ userName, requestData }) {
  const dispatch = useDispatch();

  const { userInfo } = useContext(UserContext);

  const { data, isLoading, refetch } = useFetchFriendsList(
    userInfo.accessToken,
    requestData?.receiver?.id
  );

  function handleAcceptRequest(e) {
    dispatch({
      type: 'notifications/acceptFriendRequest',
      payload: {
        senderId: requestData?.requester?.id,
        receiverId: requestData?.receiver?.id,
        friendshipStatus: e.target.innerText == 'Accept' ? 'accepted' : 'blocked',
      },
    });

    dispatch(hideNotification());
    refetch();
  }

  function handleDeclineRequest() {}
  console.log('LOGGING FRIENDS LIST: ', data);
  return (
    <div className="px-5 flex border-b border-slate-600 items-center">
      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-orange-900">
        <HiMiniUserPlus className="text-[#FF6B4D]" size={25} />
      </div>
      <div className="flex flex-col gap-3 my-5 mx-5">
        <h1>
          <span className="font-extrabold">{userName}</span> wants to connect
        </h1>
        <div className="flex justify-between items-center">
          <button
            className="border-0 bg-[#FF6B4D] hover:opacity-90 text-[#2A1108] rounded-[7px] font-bold text-[14.5px] normal-case w-[45%] h-8 cursor-pointer"
            onClick={handleAcceptRequest}
          >
            Accept
          </button>
          <button
            className="w-[45%] bg-transparent text-white border border-[#2C2640] hover:bg-[#241E38] transition-colors duration-200 rounded-[7px] text-[14.5px] h-8 normal-case font-bold cursor-pointer"
            onClick={handleDeclineRequest}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingRequestCard;
