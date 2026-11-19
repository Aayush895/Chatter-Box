import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFetchChats } from '../../../Hooks/Queries/useFetchChats';
import ChatBody from './ChatBody';
import ChatNav from './ChatNav';
import ChatInput from './ChatInput';
import UserContext from '../../../Context/UserContext';

function ChatLayout() {
  const { userInfo } = useContext(UserContext);
  const senderId = useSelector((state) => state.messages.senderId);
  const receiverId = useSelector((state) => state.messages.receiverId);
  const { userChats } = useFetchChats(userInfo.accessToken, senderId, receiverId);

  return (
    <div className="flex flex-col w-full h-dvh">
      <ChatNav />
      <div className="flex-1 min-h-0">
        <ChatBody userChats={userChats} senderId={senderId} receiverId={receiverId} />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatLayout;
