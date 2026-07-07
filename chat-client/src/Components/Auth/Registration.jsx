import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

function Registration() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="w-full lg:w-1/2 mx-auto px-6 sm:px-10 lg:px-13 py-10 lg:py-14">
      {!isLogin ? <Signup setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />}
    </div>
  );
}
export default Registration;