function UserCard({ avatarUrl = '', userName, setShowMessageComponent }) {
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-[#241E38]"
      onClick={() => setShowMessageComponent(true)}
    >
      <div className="relative shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#2C2640] flex items-center justify-center text-sm font-semibold text-slate-300">
            {initials}
          </div>
        )}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#5EEAD4] border-2 border-[#1A1628]" />
      </div>

      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-[#F3F1F7] truncate">{userName}</p>
        <p className={`text-xs font-['JetBrains_Mono',monospace]`}></p>
      </div>
    </div>
  );
}

export default UserCard;
