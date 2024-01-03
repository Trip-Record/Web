import { InputProps, REGISTER_LABEL } from "./RegisterInput";

export interface AgeValue {
  value: string;
  text: string;
}
interface SelectProps extends InputProps {
  options: Array<AgeValue>;
}

export default function RegisterSelectInput({
  label,
  placeholder,
  setValue,
  value,
  type,
  error,
  options,
}: SelectProps) {
  return (
    <div className="flex justify-between w-full flex-col">
      <label htmlFor={label} className={REGISTER_LABEL}>
        {label}
      </label>
      <select
        id="age"
        name="age"
        className="w-full h-10 border-2 p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ color: "black" }}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
