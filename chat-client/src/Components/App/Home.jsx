import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useWelcomeQuery } from '../../Hooks/Queries/useWelcomeQuery';
import UserContext from '../../Context/UserContext';
import ChatList from './WelcomeDashboard/ChatList';
import WelcomeBanner from './WelcomeDashboard/WelcomeBanner';
// TODO: Once token expires, I get brought back to the login page but on refresh, the toast keeps on playing. Need to fix that issue as well.
function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const incomingRequestState = useSelector(
    (state) => state.pendingRequestsNotification.incomingRequest
  );

  const getStoredToken = () => {
    try {
      return JSON.parse(localStorage.getItem('accessToken'));
    } catch {
      return null;
    }
  };

  const accessToken = getStoredToken();

  const { data, isError, error, isSuccess } = useWelcomeQuery(accessToken);

  // UseEffect when there is an error
  useEffect(() => {
    if (isError) {
      navigate('/', {
        state: {
          errorDescription: error.response.data.description,
          status: error.response.statusText,
        },
      });
      localStorage.removeItem('accessToken');
      setUserInfo({
        userName: '',
        email: '',
        accessToken: '',
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
    if (isSuccess) {
      dispatch({ type: 'socket/connect', payload: data?.data?.accessToken });
    }

    return () => {
      dispatch({ type: 'socket/disconnect' });
    };
  }, [isSuccess]);

  // If the request was successfully sent then this effect will run
  useEffect(() => {
    if (
      incomingRequestState &&
      typeof incomingRequestState == 'object' &&
      Object.keys(incomingRequestState).length > 0
    ) {
      toast.success(`${incomingRequestState.senderName} sent a connection request`, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored',
        transition: Slide,
      });
    }
  }, [incomingRequestState]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-stretch bg-[#14111F] min-h-screen w-full">
        <ChatList />
        <WelcomeBanner username={data?.data?.userInfo?.userName} />
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
