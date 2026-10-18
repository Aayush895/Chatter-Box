import { IoIosSettings, IoIosPerson, IoIosLogOut } from 'react-icons/io';

function SettingsMenu() {
  return (
    <div className="dropdown dropdown-top">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
        <IoIosSettings className="text-lg shrink-0" />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-[#241E38] rounded-box z-1 w-52 p-2 mb-2 shadow-sm border border-[#2C2640]"
      >
        <li>
          <button type="button">
            <IoIosPerson className="text-lg shrink-0" />
            Edit Profile
          </button>
        </li>
        <li>
          <button type="button">
            <IoIosLogOut className="text-lg shrink-0" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SettingsMenu;
