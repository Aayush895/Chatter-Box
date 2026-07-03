function Header({ headerText, subHeaderText }) {
  return (
    <div className="mb-7">
      <p className="font-['Fraunces',serif] text-7xl leading-16 tracking-wide text-[#F3F1F7] mb-1.5">
        {headerText}
      </p>
      <p className="text-2xl tracking-wider leading-32 text-[#9992AC] font-normal">
        {subHeaderText}
      </p>
    </div>
  );
}
export default Header;
