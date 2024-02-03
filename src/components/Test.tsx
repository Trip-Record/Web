export default function Test() {
  const register = () => {
    fetch("http://15.164.19.143:8080/users/signup", {
      method: "post",
      body: JSON.stringify({
        userEmail: "테스트계정w@gmail.com",
        userPassword: "1234w",
        userNickname: "테스트계정w",
        userAge: "2000-01-01",
        userBasicProfileId: 1,
      }),
    });
  };

  const login = () => {
    fetch("http://15.164.19.143:8080/users/login", {
      method: "post",
      body: JSON.stringify({
        userEmail: "testexception@naver.com",
        userPassword: 1111,
      }),
    });
  };

  const test = () => {
    fetch("http://15.164.19.143:8080/trip-styles")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      {" "}
      텥스트 페이지
      <button onClick={register}>회워나입</button>
      <button onClick={login}>로그인</button>
      <button onClick={test}>테스트</button>
    </div>
  );
}
