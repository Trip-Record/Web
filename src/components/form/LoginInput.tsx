import { InputType } from "../RegisterPage";

export interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type: InputType;
  inputType: "password" | "text";
}

export const LOGIN_LABEL =
  "w-[160px] lg:w-[200px] text-left flex justify-between items-center font-semibold";

export default function LoginInput({
  label,
  placeholder,
  setValue,
  value,
  inputType = "text",
}: InputProps) {
  return (
    <>
      <div className="flex justify-between w-full flex-col gap-1">
        <label htmlFor={label} className={LOGIN_LABEL}>
          {label}
        </label>
        <input
          type={inputType}
          id={label}
          name={label}
          placeholder={placeholder}
          className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
}
