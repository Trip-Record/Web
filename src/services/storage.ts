export function getLoginToken() {
  return localStorage.getItem("token");
}

export function setLoginToken(token: string) {
  localStorage.setItem("token", token);
}
