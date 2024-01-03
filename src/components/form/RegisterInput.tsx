import { InputType, FormError } from "../RegisterPage";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type?: InputType;
  error?: FormError;
}
export default function RegisterStringInput({
  label,
  placeholder,
  setValue,
  value,
  type,
  error,
}: Props) {
  return (
    <div className="flex justify-between w-full flex-col sm:flex-row">
      <label
        htmlFor={label}
        className="w-[160px] mb-2 mt-2 text-left flex justify-between items-center"
      >
        {label}
      </label>
      <input
        type="text"
        id={label}
        name={label}
        placeholder={placeholder}
        className={`h-10 border-2 text-black p-2 w-full ${
          type === error?.errorType && "border-red-300"
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // required
      />
    </div>
  );
}
