import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosNotifications } from 'react-icons/io';
import { showNotification, hideNotification } from '../../../Slices/notificationSlice';
import { useFetchPendingRequests } from '../../../Hooks/Queries/useFetchPendingRequests';
import { useFetchFriendsList } from '../../../Hooks/Queries/useFetchFriendsList';
import UserContext from '../../../Context/UserContext';
import Notification from '../Notifications/Notification';
import UserCard from '../Utils/UserCard';
import SelfUserCard from '../Utils/SelfUserCard';
import EmptyFriendsList from './EmptyFriendsList';

function ChatList({ userId }) {
  const { userInfo } = useContext(UserContext);

  const isNotificationVisible = useSelector((state) => {
    return state.pendingRequestsNotification.isNotificationVisible;
  });
  const lastAcceptedRequestData = useSelector((state) => {
    return state.pendingRequestsNotification.lastAcceptedRequestData;
  });

  const dispatch = useDispatch();

  const { pendingRequestData, hasRequestsLoaded, refetchPendingRequests } =
    useFetchPendingRequests(userInfo.accessToken);

  const { fetchedFriendsListData, refetchFriendsList } = useFetchFriendsList(
    userInfo.accessToken
  );

  function handleShowNotification() {
    dispatch(showNotification());
    refetchPendingRequests();
  }

  function handleHideNotification() {
    dispatch(hideNotification());
  }

  useEffect(() => {
    if (userId) refetchFriendsList();
  }, [userId, lastAcceptedRequestData]);

  useEffect(() => {
    if (lastAcceptedRequestData) refetchPendingRequests();
  }, [lastAcceptedRequestData]);

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
          className="relative flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-[#241E38]"
          onClick={handleShowNotification}
        >
          <IoIosNotifications className="text-lg" />
          {pendingRequestData && pendingRequestData.data?.length > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-[#FF6B4D] ring-2 ring-[#14111F]" />
          )}
        </div>
      </div>

      <Notification
        isVisible={isNotificationVisible}
        onClose={handleHideNotification}
        pendingRequestData={pendingRequestData?.data}
        isLoading={hasRequestsLoaded}
      />

      <div className="w-full mb-10 shrink-0">
        <input
          type="text"
          placeholder="Search conversations"
          className="input w-full bg-transparent"
        />
      </div>

      {/* TODO: Try to attach a loader component here */}
      {fetchedFriendsListData && fetchedFriendsListData.data.length > 0 ? (
        <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-[#2C2640]">
          {fetchedFriendsListData &&
            Array.isArray(fetchedFriendsListData.data) &&
            fetchedFriendsListData.data.length > 0 &&
            fetchedFriendsListData.data.map((friend) => (
              <div key={friend.id} className="shrink-0">
                <UserCard
                  friendUserName={friend.userName}
                  friendUserId={friend.id}
                  userId={userId}
                />
              </div>
            ))}
        </div>
      ) : (
        <EmptyFriendsList />
      )}

      <SelfUserCard userInfo={userInfo} />
    </div>
  );
}

export default ChatList;
