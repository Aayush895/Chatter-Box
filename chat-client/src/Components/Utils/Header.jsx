function Header({ headerText, subHeaderText }) {
  return (
    <div className="mb-6 sm:mb-7">
      <p className="font-['Fraunces',serif] text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-wide text-[#F3F1F7] mb-1.5">
        {headerText}
      </p>
      <p className="text-sm sm:text-base tracking-wide leading-relaxed text-[#9992AC] font-normal">
        {subHeaderText}
      </p>
    </div>
  );
}
export default Header;