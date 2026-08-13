function AppButton({ Icon, btnText, btnStyles }) {
  return (
    <button className={`btn ${btnStyles}`}>
      <Icon />
      {btnText}
    </button>
  );
}

export default AppButton;
