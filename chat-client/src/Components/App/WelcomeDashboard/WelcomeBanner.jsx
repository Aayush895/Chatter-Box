import { HiMiniUserPlus } from 'react-icons/hi2';
// import { CiShare2 } from 'react-icons/ci';
// import AppButton from '../../Utils/AppButton';
import SearchUsers from '../Utils/SearchUsers';

function WelcomeBanner({ username }) {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col bg-[radial-gradient(120%_120%_at_0%_0%,#201A38_0%,#14111F_60%)] px-5">
      <div className="border border-[#2C2640] w-20 h-20 md:w-27.5 md:h-27.5 flex justify-center items-center rounded-4xl bg-[#241E38] mb-10 md:mb-20 shrink-0">
        <HiMiniUserPlus className="text-[#FF6B4D]" size={60} />
      </div>

      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[33%] mb-10">
        <h1 className="text-center text-2xl md:text-4xl mb-5 wrap-break-word">
          You're all setup, {username}
        </h1>
        <p className="text-base md:text-xl text-gray-400 text-center">
          Your inbox is empty for now. Find people by username or email or invite a friend
          to join wisp.
        </p>
      </div>

      <SearchUsers />

      {/* <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <AppButton
          Icon={HiMiniUserPlus}
          btnText="Add a contact"
          btnStyles="w-full sm:w-[48%] bg-[#FF6B4D] hover:opacity-90 text-[#2A1108] border-0 rounded-[10px] font-bold text-[14.5px] normal-case"
        />
        <AppButton
          Icon={CiShare2}
          btnText="Invite a friend"
          btnStyles="w-full sm:w-[48%] bg-transparent text-white border border-[#2C2640] hover:bg-[#241E38] transition-colors duration-200 rounded-[10px] font-semibold text-[14.5px] normal-case font-bold"
        />
      </div> */}
    </div>
  );
}

export default WelcomeBanner;
