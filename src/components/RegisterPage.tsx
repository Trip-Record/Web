// RegisterPage.tsx
import React, { useState } from "react";
import RegisterStringInput from "./form/RegisterInput";
import RegisterSelectInput, { AgeValue } from "./form/RegisterSelectInput";
import { registerValidation } from "../validations/register";

interface RegisterPageProps {}
export type InputType =
  | "email"
  | "id"
  | "password"
  | "confirmPassword"
  | "name"
  | "age";
export interface FormError {
  errorType?: InputType;
  errorMessage?: string;
}

const AGE_VALUES: Array<AgeValue> = [
  { text: "15세 미만", value: "15미만" },
  { text: "16~20세", value: "16~20세" },
  { text: "21~25세", value: "21~25세" },
  { text: "26~30세", value: "26~30세" },
  { text: "31~35세", value: "31~35세" },
  { text: "36~40세", value: "36~40세" },
  { text: "41~45세", value: "41~45세" },
  { text: "46~50세", value: "46~50세" },
  { text: "51~55세", value: "51~55세" },
  { text: "56~60세", value: "56~60세" },
  { text: "61~65세", value: "61~65세" },
  { text: "65세 초과", value: "65세 초과" },
];

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<FormError>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError({});

    const emailError = registerValidation.email(email);
    if (emailError) return setError(emailError);

    const idError = registerValidation.id(id);
    if (idError) return setError(idError);

    const passwordError = registerValidation.password(password);
    if (passwordError) return setError(passwordError);

    const confirmError = registerValidation.confirmPassword(
      password,
      confirmPassword
    );
    if (confirmError) return setError(confirmError);

    const nameError = registerValidation.name(name);
    if (nameError) return setError(nameError);

    console.log("회원가입 정보:", { email, id, password, name, age });
  };

  return (
    <div className="flex flex-col w-full max-w-[700px] h-1/2 m-auto mt-10 items-center bg-sky-50 text-center rounded-lg text-black p-4 border border-black/20 shadow-md">
      <h1 className="text-3xl mb-4 mt-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-1">
        <RegisterStringInput
          label="이메일"
          placeholder="이메일을 입력해주세요"
          setValue={setEmail}
          value={email}
          type="email"
          error={error}
          inputType="email"
        />
        <RegisterStringInput
          label="아이디"
          placeholder="아이디를 입력해주세요"
          setValue={setId}
          value={id}
          type="id"
          error={error}
        />
        <RegisterStringInput
          label="비밀번호"
          placeholder="비밀번호를 8자 이상 입력해주세요"
          setValue={setPassword}
          value={password}
          type="password"
          error={error}
          inputType="password"
        />
        <RegisterStringInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          setValue={setConfirmPassword}
          value={confirmPassword}
          type="confirmPassword"
          error={error}
          inputType="password"
        />
        <RegisterStringInput
          label="사용자 이름"
          placeholder="00에서 사용하실 이름을 입력해주세요"
          setValue={setName}
          value={name}
          type="name"
          error={error}
        />
        <RegisterSelectInput
          label="나이"
          value={age}
          setValue={setAge}
          placeholder="나이"
          error={error}
          type="age"
          options={AGE_VALUES}
        />
        <input
          type="submit"
          value="회원가입"
          className="bg-lime-200 h-10 mt-2 mb-2 rounded-md border border-black/20"
          style={{ color: "black" }}
        />
      </form>
    </div>
  );
};

export default RegisterPage;
