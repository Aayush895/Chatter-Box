import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useHealthQuery } from '../../Hooks/Queries/useHealthQuery';
import UserContext from '../../Context/UserContext';
import ApiErrorContext from '../../Context/ApiErrorContext';
import App from '../../App';
import Home from '../App/Home';
import AppLoader from '../AppLoader';
import { getErrorMessage } from '../../../utitlity';
import AppError from '../AppError';

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

  const { isLoading, isError, error, refetch, isFetching } = useHealthQuery();
  if (isLoading) return <AppLoader />;

  if (isError) {
    const { status, description } = getErrorMessage(error);
    return (
      <AppError
        status={status}
        description={description}
        onRetry={refetch}
        isRetrying={isFetching}
      />
    );
  }

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
