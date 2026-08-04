import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useHealthQuery } from '../../Hooks/Queries/useHealthQuery';
import UserContext from '../../Context/UserContext';
import App from '../../App';
import Home from '../App/Home';

function Main() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    accessToken: '',
  });

  const { isLoading } = useHealthQuery();
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <BrowserRouter>
      <UserContext value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/welcome" element={<Home />}></Route>
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
}

export default Main;
