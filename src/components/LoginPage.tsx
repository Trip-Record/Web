import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginInput from "../components/form/LoginInput";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className=" flex justify-center w-full h-full">
      <div className="flex flex-col max-w-md items-center m-auto mt-40 text-center w-full">
        <h1 className="text-4xl font-bold mb-5">로그인</h1>
        <div className=" bg-white shadow w-full text-center rounded-md">
          <form className="flex flex-col mb-4 items-center w-full p-5 gap-3">
            <LoginInput
              label="아이디"
              value={id}
              type="id"
              setValue={setId}
              inputType="text"
              placeholder="아이디를 입력해주세요"
            />
            <LoginInput
              label="비밀번호"
              value={password}
              type="password"
              setValue={setPassword}
              inputType="password"
              placeholder="비밀번호를 입력해주세요"
            />

            <input
              type="submit"
              value="로그인"
              className="w-full rounded-md bg-blue-400 h-10 border-black/20 mt-4"
            />
            <Link
              className="text-[12px] ml-auto underline text-black/70 -mt-2"
              to="/register"
            >
              회원가입 →
            </Link>
          </form>

          <Routes>
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
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
}
