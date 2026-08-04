import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useWelcomeQuery } from '../../Hooks/Queries/useWelcomeQuery';
import UserContext from '../../Context/UserContext';

function Home() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const { isError } = useWelcomeQuery(userInfo?.accessToken);

  if (isError == true) {
    navigate('/');
  }

  return <div>Home</div>;
}

export default Home;
