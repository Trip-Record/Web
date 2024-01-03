import { FormError } from "../components/RegisterPage";

export const registerValidation = {
  email: (value: string): FormError | undefined => {
    if (value === "")
      return { errorType: "email", errorMessage: "이메일을 입력해 주세요" };
  },
  id: (value: string): FormError | undefined => {
    if (value === "")
      return { errorType: "id", errorMessage: "ID를 입력해주세요" };
    if (value.length < 4)
      return { errorType: "id", errorMessage: "4자 이상 입력해주세요" };
  },
  password: (value: string): FormError | undefined => {
    if (value === "")
      return { errorType: "password", errorMessage: "비밀번호를 입력해주세요" };
    if (value.length < 8)
      return { errorType: "password", errorMessage: "8자 이상 입력해주세요" };
    // TODO: 대소문자 and 특수문자 입력 포함시 추가
  },
  confirmPassword: (
    password: string,
    password2: string
  ): FormError | undefined => {
    if (password === "")
      return {
        errorType: "confirmPassword",
        errorMessage: "비밀번호 확인 입력해주세요",
      };
    if (password !== password2)
      return {
        errorType: "confirmPassword",
        errorMessage: "비밀번호가 일치하지 않습니다",
      };
  },
  name: (value: string): FormError | undefined => {
    if (value === "")
      return { errorType: "name", errorMessage: "이름을 입력해주세요" };
  },
};
