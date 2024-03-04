// RegisterPage.tsx
import React, { useState } from "react";
import RegisterStringInput from "./form/RegisterInput";
import { registerValidation } from "../validations/register";
import Radios from "./form/Radios";
import { HOST } from "../constants";
import { useNavigate } from "react-router-dom";

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

const BASIC_PROFILE = [
  {
    image: "/profile-icons/Cat.png",
    title: "고양이",
  },
  {
    image: "/profile-icons/Dog.png",
    title: "강아지",
  },
  {
    image: "/profile-icons/Elephant.png",
    title: "코끼리",
  },
  {
    image: "/profile-icons/Panda.png",
    title: "팬더",
  },
  {
    image: "/profile-icons/Rabbit.png",
    title: "토끼",
  },
  {
    image: "/profile-icons/Profile.png",
    title: "프로필 없음",
  },
];

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [error, setError] = useState<FormError>({});
  const [basicProfileValue, setBasicProfileValue] = useState("");

  const navi = useNavigate();

  const getDateYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dateString = year + "-" + month + "-" + day;
    return dateString;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError({});

    const emailError = registerValidation.email(email);
    if (emailError) return setError(emailError);

    const passwordError = registerValidation.password(password);
    if (passwordError) return setError(passwordError);

    const confirmError = registerValidation.confirmPassword(
      password,
      confirmPassword
    );
    if (confirmError) return setError(confirmError);

    const nameError = registerValidation.name(name);
    if (nameError) return setError(nameError);

    console.log("회원가입 정보:", {
      email,
      password,
      name,
      birthDay,
      basicProfileValue,
    });

    fetch(`${HOST}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userEmail: email,
        userPassword: password,
        userNickname: name,
        userAge: birthDay,
        userBasicProfileId: 1, //TODO: 정수형으로 요청
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("회원가입이 정상처리 되었습니다.");
        navi("/");
      } else if (res.status === 409) {
        setError({
          errorMessage: "이미 가입된 이메일입니다.",
          errorType: "email",
        });
        console.log("이미 존재하는 이메일입니다.");
      }
    });
  };

  return (
    <section className=" flex justify-center w-full">
      <div className="flex flex-col items-center p-2 max-w-md w-full">
        <h1 className="text-4xl mb-4 mt-4 text-center font-extrabold">
          회원가입
        </h1>
        <div className="flex flex-col w-full max-w-lg m-auto mt-10 items-center bg-white text-center rounded-lg text-black p-8 shadow">
          <form
            action="/aaaa"
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-5"
          >
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
              placeholder="사용하실 이름을 입력해주세요"
              setValue={setName}
              value={name}
              type="name"
              error={error}
            />

            <label className="w-[160px] lg:w-[200px] text-left flex  justify-between items-center font-bold -mb-3">
              생년월일
            </label>
            <input
              type="date"
              name="birthDay"
              min="1950-01-01"
              max={getDateYYYYMMDD(new Date())}
              onChange={(e) =>
                setBirthDay(getDateYYYYMMDD(new Date(e.target.value)))
              }
              className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full"
            />

            <div className="w-[160px] lg:w-[200px] text-left flex justify-between items-center font-bold -mb-3">
              프로필
            </div>
            <div className="grid grid-cols-3">
              <Radios
                className=""
                valueList={BASIC_PROFILE}
                setSelect={setBasicProfileValue}
                hiddnTitle
                imageBackGround={false}
              />
            </div>
            <input
              type="submit"
              value="회원가입"
              className="bg-blue-400 h-10 mt-2 mb-2 rounded-md border border-black/20 text-white font-bold"
            />
          </form>
        </div>
        <div className="my-10 flex w-full items-center">
          <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-400" />
          <span className="text-sm uppercase mx-5 font-medium text-gray-600 dark:text-gray-300">
            OR
          </span>
          <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-400" />
        </div>
        <div className="mb-10 flex flex-col w-full items-center">
          {/* <button
            style={{ backgroundColor: "lightgreen" }}
            className="w-full max-w-xs mx-auto flex justify-center py-2 items-center px-8 border hangug shadow-sm border-transparent rounded-md text-gray-700 transition duration-150 ease-in-out hover:opacity-75 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray font-bold"
          >
            네이버로 회원가입 →
          </button> */}
          <img
            src="/naverLogin2.png"
            className="max-w-xs max-h-14"
            alt="네이버로그인"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
