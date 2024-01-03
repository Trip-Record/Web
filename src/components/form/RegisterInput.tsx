import { InputType, FormError } from "../RegisterPage";

export interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type: InputType;
  error: FormError;
  inputType?: "email" | "password" | "number" | "text";
}

export default function RegisterStringInput({
  label,
  placeholder,
  setValue,
  value,
  type,
  error,
  inputType = "text",
}: InputProps) {
  return (
    <>
      <div className="flex justify-between w-full flex-col sm:flex-row">
        <label
          htmlFor={label}
          className="w-[160px] lg:w-[200px] lg:text-lg text-left flex justify-between items-center"
        >
          {label}
        </label>
        <input
          type={inputType}
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
      {error && type === error?.errorType && (
        <div className="text-red-500">{error.errorMessage}</div>
      )}
    </>
  );
}
