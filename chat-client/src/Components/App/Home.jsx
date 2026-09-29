import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useWelcomeQuery } from '../../Hooks/Queries/useWelcomeQuery';
import { io } from 'socket.io-client';
import UserContext from '../../Context/UserContext';
import ChatList from './WelcomeDashboard/ChatList';
import WelcomeBanner from './WelcomeDashboard/WelcomeBanner';
import { initialiseSocket } from '../../Slices/socketSlice';
import { SOCKET_ENDPOINT } from '../../Config/clientConfigs';

function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const initialSocketState = useSelector((state) => state.clientSocket);
  const dispatch = useDispatch();

  const { data, isError, error, isSuccess } = useWelcomeQuery(
    JSON.parse(localStorage.getItem('accessToken') || '')
  );

  // UseEffect when there is an error
  useEffect(() => {
    if (isError) {
      console.log(error.response);
      navigate('/', {
        state: {
          errorDescription: error.response.data.description,
          status: error.response.statusText,
        },
      });
      return;
    }
  }, [isError, error]);

  // useEffect if the login is successful
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      userName: data?.data?.userInfo?.userName,
      email: data?.data?.userInfo?.email,
      accessToken: data?.data?.accessToken,
    });
  }, [data]);

  // useEffect when the component has finished mounting to establish a websocket connection
  useEffect(() => {
    // TODO: Need to fix the issue of socket connection
    // Error: Cannot send 'non-serializable' data as payload in redux
    let socket = null;
    if (isSuccess) {
      socket = io(SOCKET_ENDPOINT, {
        auth: {
          accessToken: data?.data?.accessToken,
        },
      });

      dispatch(initialiseSocket(socket));
    }

    return () => {
      socket?.disconnect();
    };
  }, [isSuccess]);

  // useEffect for handling all the listeners from the socket
  useEffect(() => {
    console.log('LOGGING SOCKET: ', initialSocketState);
    initialSocketState?.on('friend-request:received', (data) => {
      console.log('LOGGING DATA FROM RECEIVER END: ', data);
    });

    return () => {
      initialSocketState?.off('friend-request:received');
    };
  }, [initialSocketState]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch bg-[#14111F] min-h-screen w-full">
      <ChatList />
      <WelcomeBanner username={data?.data?.userInfo?.userName} />
    </div>
  );
}

export default Home;
