import { useEffect, useContext } from 'react';
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
  const { userChats, refetchChats } = useFetchChats(
    userInfo.accessToken,
    senderId.payload,
    receiverId.payload
  );

  useEffect(() => {
    refetchChats();
  }, []);

  console.log('LOGGING CHATS: ', userChats);

  return (
    <div className="flex flex-col w-full h-dvh">
      <ChatNav />
      <div className="flex-1 min-h-0">
        <ChatBody />
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatLayout;
