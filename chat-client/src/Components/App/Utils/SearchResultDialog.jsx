import { useState, useContext } from 'react';
import { useFriendRequestMutation } from '../../../Hooks/Mutations/useFriendRequestMutation';
import UserContext from '../../../Context/UserContext';
function SearchResultDialog({ users, isLoading }) {
  const [receiverUserName, setReceiverUserName] = useState('');

  const { userInfo } = useContext(UserContext);

  const friendRequestMutationFn = useFriendRequestMutation(
    userInfo?.accessToken,
    userInfo?.userName,
    receiverUserName
  );

  function handleFriendRequest(receiverUserName) {
    setReceiverUserName(receiverUserName);
    friendRequestMutationFn.mutate();
  }

  return (
    <div className="border border-white/20 w-full max-w-md sm:w-92 bg-[#241E38] rounded-xl shadow-lg overflow-hidden">
      {isLoading ? (
        <p>
          Loading... <span className="loading loading-dots loading-xl"></span>
        </p>
      ) : users && users.length > 0 ? (
        <ul className="divide-y divide-white/10 max-h-80 overflow-y-auto">
          {users.map((user, idx) => {
            return (
              <li
                className="list-none px-4 py-3 hover:bg-white/5 transition-colors"
                key={`${user.userName}-${idx}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 h-9 w-9 rounded-full bg-indigo-500/30 flex items-center justify-center text-white text-sm font-medium uppercase">
                      {user.userName?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {user.userName}
                      </p>
                      <p className="text-white/50 text-xs truncate">{user.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFriendRequest(user.userName)}
                    className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 transition-colors whitespace-nowrap"
                  >
                    Add Friend
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-red-500 text-sm text-center py-6 px-4">No users found</p>
      )}
    </div>
  );
}

export default SearchResultDialog;
