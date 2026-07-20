import { useState } from 'react';
import { useRegisterUserMutation } from '../../Hooks/Mutations/useRegisterUserMutation';
import { UserEmailSvg, UserNameSvg, UserPasswordSvg } from '../../Mocks/svgMocks';
import Button from '../Utils/Button';
import Header from '../Utils/Header';
import Input from '../Utils/Input';

function Signup({ setIsLogin }) {
  const [userInformation, setuserInformation] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const registerUserFn = useRegisterUserMutation(userInformation);

  function handleUserInformation(e) {
    const { id, value } = e.target;
    if (id == 'input-username') {
      setuserInformation({
        ...userInformation,
        userName: value,
      });
    } else if (id == 'input-password') {
      setuserInformation({
        ...userInformation,
        password: value,
      });
    } else if (id == 'input-confirm-password') {
      setuserInformation({
        ...userInformation,
        confirmPassword: value,
      });
    } else {
      setuserInformation({
        ...userInformation,
        email: value,
      });
    }
  }

  function handleFormSubmit() {
    registerUserFn.mutate();
  }

  return (
    <div className="bg-[#14111F] w-full px-6 sm:px-10 lg:px-14 py-10 lg:py-14 flex flex-col items-center lg:items-start justify-center">
      <Header
        headerText="Create your account"
        subHeaderText="Takes about 30 seconds. No credit card."
      />
      <div className="w-full sm:max-w-105">
        <Input
          id="input-username"
          label="Username"
          placeholder="Username"
          Svg={UserNameSvg}
          type="text"
          validator="[A-Za-z][A-Za-z0-9\-]*"
          title="Only letters, numbers or dash"
          minLength="3"
          maxLength="30"
          handleUserInformation={handleUserInformation}
          Hint={() => (
            <p className="validator-hint">
              Must be 3 to 30 characters containing only letters, numbers or dash
            </p>
          )}
        />
        <Input
          id="input-email"
          label="Email"
          placeholder="mail@site.com"
          Svg={UserEmailSvg}
          type="email"
          handleUserInformation={handleUserInformation}
          Hint={() => <p className="validator-hint">Enter valid email address</p>}
        />
        <Input
          id="input-password"
          label="Password"
          placeholder="At least 8 characters"
          Svg={UserPasswordSvg}
          type="password"
          validator="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          minLength="8"
          handleUserInformation={handleUserInformation}
          Hint={() => (
            <p className="validator-hint">
              Must be more than 8 characters, including at least one number, one lowercase
              letter, one uppercase letter
            </p>
          )}
        />
        <Input
          id="input-confirm-password"
          label="Confirm password"
          placeholder="Type it again"
          Svg={UserPasswordSvg}
          type="password"
          validator="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          minLength="8"
          handleUserInformation={handleUserInformation}
          Hint={() => (
            <p className="validator-hint">
              Must be more than 8 characters, including at least one number, one lowercase
              letter, one uppercase letter
            </p>
          )}
        />
      </div>
      <div className="mt-2 w-full sm:max-w-105">
        <Button btnText="Create account" handleFormSubmit={handleFormSubmit} />
        <p className="text-center text-[13.5px] text-[#9992AC] font-normal mt-5">
          Already have an account?{' '}
          <span
            className="text-[#FF6B4D] font-semibold cursor-pointer hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
export default Signup;
