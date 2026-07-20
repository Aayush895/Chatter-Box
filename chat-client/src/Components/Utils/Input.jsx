function Input({
  label,
  Svg,
  placeholder,
  type,
  Hint,
  validator = '',
  title = '',
  minLength = '',
  maxLength = '',
  id,
  handleUserInformation,
}) {
  return (
    <div>
      <label
        htmlFor={placeholder}
        className="block text-xs font-medium text-[#9992AC] mb-1.5"
      >
        {label}
      </label>
      <label className="input input-lg validator w-full bg-[#1D1830] border-[#2C2640] focus-within:border-[#FF6B4D] rounded-[10px] gap-2">
        <Svg className="w-4 h-4 text-[#6B6480]" />
        <input
          id={id}
          type={type}
          required
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          pattern={validator}
          title={title}
          onChange={handleUserInformation}
          className="text-[13px] text-[#F3F1F7] placeholder:text-[#6B6480] font-normal"
        />
      </label>
      <div className="mt-1">{Hint && <Hint />}</div>
    </div>
  );
}
export default Input;
