import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import BrandPanel from './BrandPanel';
import Registration from './Registration';

function AuthPage() {
  const location = useLocation();

  useEffect(() => {
    const locationState = location?.state;
    if (locationState?.status && locationState?.errorDescription) {
      toast.error(`${locationState.status}: ${locationState.errorDescription}`, {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Bounce,
      });
    }
  }, [location]);
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#14111F]">
        <BrandPanel />
        <div className="divider divider-horizontal hidden lg:flex m-0"></div>
        <Registration />
      </div>
      <ToastContainer />
    </>
  );
}
export default AuthPage;
