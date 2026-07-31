import { useState } from 'react';
import Header from '../Utils/Header';
import Input from '../Utils/Input';
import Button from '../Utils/Button';
import { UserEmailSvg, UserPasswordSvg } from '../../Mocks/svgMocks';
import { useLoginUserMutation } from '../../Hooks/Mutations/useLoginUserMutation';

function Login({ setIsLogin }) {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: '',
    password: '',
  });

  const loginMutation = useLoginUserMutation(userLoginInfo);

  function handleLoginInformation(e) {
    const { id, value } = e.target;
    if (id == 'input-email') {
      setUserLoginInfo({
        ...userLoginInfo,
        email: value,
      });
    } else {
      setUserLoginInfo({
        ...userLoginInfo,
        password: value,
      });
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    loginMutation.mutate();
  }
  return (
    <form className="bg-[#14111F] w-full px-6 sm:px-10 lg:px-14 py-10 lg:py-14 flex flex-col items-center lg:items-start justify-center">
      <Header
        headerText="Welcome back"
        subHeaderText="Log in to pick up where you left off."
      />
      <div className="w-full sm:max-w-105">
        <Input
          id="input-email"
          label="Email"
          placeholder="mail@site.com"
          Svg={UserEmailSvg}
          type="email"
          handleLoginInformation={handleLoginInformation}
          Hint={() => <p className="validator-hint">Enter valid email address</p>}
        />
        <Input
          id="input-password"
          label="Password"
          placeholder="At least 8 characters"
          Svg={UserPasswordSvg}
          type="password"
          handleLoginInformation={handleLoginInformation}
          validator="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          minLength="8"
          Hint={() => (
            <p className="validator-hint">
              Must be more than 8 characters, including at least one number, one lowercase
              letter, one uppercase letter
            </p>
          )}
        />
      </div>
      <div className="mt-2 w-full sm:max-w-105">
        <Button btnText="Log in" handleLogin={handleLogin} />
        <p className="text-center text-[13.5px] text-[#9992AC] font-normal mt-5">
          New to wisp?{' '}
          <span
            className="text-[#FF6B4D] font-semibold cursor-pointer hover:underline"
            onClick={() => setIsLogin(false)}
          >
            Create an account
          </span>
        </p>
      </div>
    </form>
  );
}
export default Login;
