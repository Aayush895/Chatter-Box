import Header from '../Utils/Header';
import Input from '../Utils/Input';
import Button from '../Utils/Button';
import { UserEmailSvg, UserPasswordSvg } from '../../Mocks/svgMocks';

function Login({ setIsLogin }) {
  return (
    <div className="bg-[#14111F] w-full">
      <Header
        headerText="Create your account"
        subHeaderText="Takes about 30 seconds. No credit card."
      />

      <div className="w-[60%]">
        <Input
          label="Email"
          placeholder="mail@site.com"
          Svg={UserEmailSvg}
          type="email"
          Hint={() => <p className="validator-hint">Enter valid email address</p>}
        />
        <Input
          label="Password"
          placeholder="At least 8 characters"
          Svg={UserPasswordSvg}
          type="password"
          validator="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          minLength="8"
          Hint={() => (
            <p className="validator-hint">
              Must be more than 8 characters, including At least one number, At least one
              lowercase letter, At least one uppercase letter
            </p>
          )}
        />
      </div>

      <div className="mt-2 w-[60%]">
        <Button btnText="Log in" />
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
    </div>
  );
}
export default Login;
