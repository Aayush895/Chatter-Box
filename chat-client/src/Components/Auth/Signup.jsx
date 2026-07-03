import { UserEmailSvg, UserNameSvg, UserPasswordSvg } from '../../Mocks/svgMocks';
import Button from '../Utils/Button';
import Header from '../Utils/Header';
import Input from '../Utils/Input';

function Signup({ setIsLogin }) {
  return (
    <div className="bg-[#14111F] w-full">
      <Header
        headerText="Create your account"
        subHeaderText="Takes about 30 seconds. No credit card."
      />

      <div className="w-[60%]">
        <Input
          label="Username"
          placeholder="Username"
          Svg={UserNameSvg}
          type="text"
          validator="[A-Za-z][A-Za-z0-9\-]*"
          title="Only letters, numbers or dash"
          minLength="3"
          maxLength="30"
          Hint={() => (
            <p className="validator-hint">
              Must be 3 to 30 characters containing only letters, numbers or dash
            </p>
          )}
        />
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
        <Input
          label="Confirm password"
          placeholder="Type it again"
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
        <Button btnText="Create account" />
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
