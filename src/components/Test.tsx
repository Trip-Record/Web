export default function Test() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDcxMjc0MjcsImV4cCI6MTcwNzIxMzgyNywidXNlcklkIjo2fQ.XbJqiVasApzfhHtp6Ia7sE1BvOG2Tv3_gyNnmJZ2w00";

  const like = () => {
    fetch("http://15.164.19.143:8080/records/21/likes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) console.log("좋아요 성공");
      else if (res.status === 409) console.log("이미 좋아요된 레코드");
    });
  };

  const dislike = () => {
    fetch("http://15.164.19.143:8080/records/21/likes", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) console.log("좋아요 취소");
      else if (res.status === 409) console.log("음...");
    });
  };

  const register = () => {
    fetch("http://15.164.19.143:8080/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userEmail: "테스트계정3@gmail.com",
        userPassword: "1234",
        userNickname: "테스트계정",
        userAge: "2000-01-01",
        userBasicProfileId: 1,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("회원가입이 정상처리 되었습니다.");
      } else if (res.status === 409) {
        console.log("이미 존재하는 이메일입니다.");
      }
    });
  };

  const login = () => {
    fetch("http://15.164.19.143:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: "테스트계정2@gmail.com",
        userPassword: 1234,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const testRecord = () => {
    fetch("http://15.164.19.143:8080/records?page=1", {
      method: "GET", // 명시적으로 메소드를 지정하는 것이 좋습니다.
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // token 값이 올바른지 확인하세요.
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => console.table(data))
      .catch((error) => console.error("Error:", error));
  };

  const test = () => {
    fetch("http://15.164.19.143:8080/trip-styles")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="flex flex-col">
      {" "}
      텥스트 페이지
      <button onClick={register}>회워나입</button>
      <button onClick={login}>로그인</button>
      <button onClick={testRecord}>테스트</button>
      <button onClick={like}>좋아요</button>
      <button onClick={dislike}>좋아요</button>
    </div>
  );
}
