import { useEffect, useRef } from "react";
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

export const REGISTER_LABEL =
  "w-[160px] lg:w-[200px] text-left flex justify-between items-center font-semibold";

export default function RegisterStringInput({
  label,
  placeholder,
  setValue,
  value,
  type,
  error,
  inputType = "text",
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && type === error?.errorType) {
      ref.current?.focus();
    }
  }, [error, type]);

  return (
    <>
      <div className="flex justify-between w-full flex-col gap-1">
        <label htmlFor={label} className={REGISTER_LABEL}>
          {label}
        </label>
        <input
          type={inputType}
          id={label}
          name={label}
          placeholder={placeholder}
          className={`h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full ${
            type === error?.errorType && "border-red-300"
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={ref}
          // required
        />
      </div>
      {error && type === error?.errorType && (
        <div className="text-red-500">{error.errorMessage}</div>
      )}
    </>
  );
}
