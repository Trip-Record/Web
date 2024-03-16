import React, { FormEvent, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginInput from "../components/form/LoginInput";
import { HOST } from "../constants";
import { getLoginToken, setLoginToken } from "../services/storage";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const { id, password, setId, setPassword, login } = useLogin();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <section className="flex justify-center w-full h-full">
      <div className="flex flex-col max-w-md items-center m-auto mt-40 text-center w-full">
        <h1 className="text-4xl font-bold mb-5">로그인</h1>
        <div className="bg-white shadow w-full text-center rounded-md">
          <form
            className="flex flex-col mb-4 items-center w-full p-5 gap-3"
            onSubmit={onSubmit}
          >
            <LoginInput
              label="이메일"
              value={id}
              type="id"
              setValue={setId}
              inputType="text"
              placeholder="이메일을 입력해주세요"
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
      </div>
    </section>
  );
}
