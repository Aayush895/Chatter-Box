import SettingsMenu from './SettingsMenu';

function SelfUserCard({ userInfo }) {
  return (
    <div className="flex justify-between items-center shrink-0 py-2">
      <div className="flex items-center min-w-0">
        <div className="border border-[#2C2640] w-17.5 h-17.5 rounded-full flex items-center justify-center shrink-0 text-xs text-center leading-none">
          Photo
        </div>
        <div className="ml-5 min-w-0">
          <p className="truncate">{userInfo.userName}</p>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EEAD4] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EEAD4]" />
            </span>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </div>
      <div className="p-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-[#241E38]">
        <SettingsMenu />
      </div>
    </div>
  );
}

export default SelfUserCard;
