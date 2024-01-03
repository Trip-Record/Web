// RegisterPage.tsx
import React, { useState } from "react";
import RegisterStringInput from "./form/RegisterInput";

interface RegisterPageProps {}
export type InputType =
  | "email"
  | "id"
  | "username"
  | "password"
  | "confirmPassword"
  | "name"
  | "age";
export interface FormError {
  errorType?: InputType;
}
const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [error, setError] = useState<FormError>({});

  const handlePasswordMatch = () => {
    if (password !== confirmPassword) {
      alert("입력한 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleBlackEmail = () => {
    if (email === "") setError({ errorType: "email" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBlackEmail();
    // 실제 회원가입 로직을 처리하는 부분
    console.log("회원가입 정보:", { email, username, password, name, age });
  };

  return (
    <div className="flex flex-col w-full max-w-[700px] h-1/2 m-auto mt-10 items-center bg-sky-400 text-center rounded-lg text-white p-4">
      <h1 className="text-3xl mb-4 mt-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
        <RegisterStringInput
          label="이메일"
          placeholder="이메일을 입력해주세요"
          setValue={setEmail}
          value={email}
          type="email"
          error={error}
        />
        <RegisterStringInput
          label="아이디"
          placeholder="아이디를 입력해주세요"
          setValue={setUsername}
          value={username}
          type="id"
        />
        <RegisterStringInput
          label="비밀번호"
          placeholder="비밀번호를 8자 이상 입력해주세요"
          setValue={setPassword}
          value={password}
          type="password"
          error={error}
        />
        <RegisterStringInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          setValue={setConfirmPassword}
          value={confirmPassword}
          type="confirmPassword"
          error={error}
        />
        <RegisterStringInput
          label="사용자 이름"
          placeholder="00에서 사용하실 이름을 입력해주세요"
          setValue={setName}
          value={name}
          type="username"
          error={error}
        />
        <label
          htmlFor="age"
          className="mb-2 mt-2 text-left flex justify-between"
        >
          나이
        </label>
        <select
          id="age"
          name="age"
          className="w-full h-10 border-2 p-2"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ color: "black" }}
        >
          <option value="">선택</option>
          <option value="15미만">15세 미만</option>
          <option value="16~20세">16~20세</option>
          <option value="21~25세">21~25세</option>
          <option value="26~30세">26~30세</option>
          <option value="31~35세">31~35세</option>
          <option value="36~40세">36~40세</option>
          <option value="41~45세">41~45세</option>
          <option value="46~50세">46~50세</option>
          <option value="51~55세">51~55세</option>
          <option value="56~60세">56~60세</option>
          <option value="61~65세">61~65세</option>
          <option value="65세 초과">65세 초과</option>
        </select>
        <div></div>
        <input
          type="submit"
          value="회원가입"
          className="bg-lime-200 h-10 mt-2 mb-2"
          style={{ color: "black" }}
        />
      </form>
    </div>
  );
};

export default RegisterPage;
