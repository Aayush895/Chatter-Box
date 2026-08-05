import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useWelcomeQuery } from '../../Hooks/Queries/useWelcomeQuery';
import UserContext from '../../Context/UserContext';

function Home() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, isError, error } = useWelcomeQuery(userInfo?.accessToken);

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

  return (
    <>
      <div>Welcome - {data?.data?.userInfo?.userName}</div>
    </>
  );
}

export default Home;
