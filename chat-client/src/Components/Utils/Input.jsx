function Input({
  label,
  Svg,
  placeholder,
  type,
  Hint,
  validator,
  title = '',
  minLength = '',
  maxLength = '',
  id,
  handleUserInformation,
}) {
  return (
    <div className="my-9">
      <label
        htmlFor={placeholder}
        className="block text-xs font-medium text-[#9992AC] mb-1.5"
      >
        {label}
      </label>
      <label className="input validator input-lg w-full bg-[#1D1830] border-[#2C2640] focus-within:border-[#FF6B4D] rounded-[10px] gap-2">
        <Svg className="w-4 h-4 text-[#6B6480]" />
        <input
          id={id}
          type={type}
          required
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          pattern={validator && validator}
          title={title}
          onChange={handleUserInformation}
          className="text-[13px] text-[#F3F1F7] placeholder:text-[#6B6480] font-normal"
        />
      </label>
      <div className="validator-hint hidden">{Hint && <Hint />}</div>
    </div>
  );
}
export default Input;
