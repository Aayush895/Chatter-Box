import { useState } from 'react';
import AuthPage from './Components/Auth/AuthPage';
import UserContext from './Context/UserContext';
import { useHealthQuery } from './Hooks/Queries/useHealthQuery';
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    accessToken: '',
  });

  const { isLoading } = useHealthQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <UserContext value={{ userInfo, setUserInfo }}>
        <AuthPage />
      </UserContext>
    </>
  );
}

export default App;
