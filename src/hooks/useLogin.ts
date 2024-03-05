import { useState } from "react";
import { HOST } from "../constants";
import { setLoginToken } from "../services/storage";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [id, setId] = useState("테스트계정2@gmail.com");
  const [password, setPassword] = useState("1234");

  const navigation = useNavigate();

  const login = () => {
    fetch(HOST + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: id,
        userPassword: password,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else {
          throw new Error("로그인에 실패했습니다.");
        }
      })
      .then((data: any) => {
        setLoginToken(data.Authorization);
        navigation("/");
      })
      .catch((err) => {
        //TODO: 에러처리
        console.log(err);
      });
  };

  return { id, setId, password, setPassword, login };
}
