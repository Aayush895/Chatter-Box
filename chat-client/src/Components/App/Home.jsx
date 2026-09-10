import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useWelcomeQuery } from '../../Hooks/Queries/useWelcomeQuery';
import UserContext from '../../Context/UserContext';
import ChatList from './WelcomeDashboard/ChatList';
import WelcomeBanner from './WelcomeDashboard/WelcomeBanner';

function Home() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, isError, error } = useWelcomeQuery(
    JSON.parse(localStorage.getItem('accessToken'))
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

  useEffect(() => {
    console.log(data);
    setUserInfo({
      ...userInfo,
      userName: data?.data?.userInfo?.userName,
      email: data?.data?.userInfo?.email,
      accessToken: data?.data?.accessToken,
    });
  }, [data]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch bg-[#14111F] min-h-screen w-full">
      <ChatList />
      <WelcomeBanner username={data?.data?.userInfo?.userName} />
    </div>
  );
}

export default Home;
