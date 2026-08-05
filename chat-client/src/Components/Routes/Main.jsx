import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useHealthQuery } from '../../Hooks/Queries/useHealthQuery';
import UserContext from '../../Context/UserContext';
import ApiErrorContext from '../../Context/ApiErrorContext';
import App from '../../App';
import Home from '../App/Home';

function Main() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    accessToken: '',
  });

  const [apiError, setApiError] = useState({
    status: '',
    description: '',
  });

  const { isLoading } = useHealthQuery();
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <BrowserRouter>
      <ApiErrorContext value={{ apiError, setApiError }}>
        <UserContext value={{ userInfo, setUserInfo }}>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/welcome" element={<Home />}></Route>
          </Routes>
        </UserContext>
      </ApiErrorContext>
    </BrowserRouter>
  );
}

export default Main;
