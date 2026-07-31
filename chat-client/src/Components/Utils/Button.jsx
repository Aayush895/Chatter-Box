function Button({ btnText, handleFormSubmit, handleLogin }) {
  const btnOnClickFn = handleFormSubmit ? handleFormSubmit : handleLogin;

  return (
    <button
      className="btn w-full bg-[#FF6B4D] hover:opacity-90 text-[#2A1108] border-0 rounded-[10px] font-semibold text-[14.5px] normal-case"
      onClick={btnOnClickFn}
    >
      {btnText}
    </button>
  );
}
export default Button;
