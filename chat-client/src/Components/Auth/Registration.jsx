import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

function Registration() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="w-[50%] mx-auto px-13 py-14">
      {!isLogin ? <Signup setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />}
    </div>
  );
}
export default Registration;
