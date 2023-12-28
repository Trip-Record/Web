import "./App.css";

function App() {
  return (
    <div className="flex flex-col w-2/3 m-auto mt-40 items-center bg-slate-300 text-center">
      <h1 className="text-3xl mb-4">TravelMaker 로고</h1>
      <h1 className="text-3xl mb-4">로그인</h1>
      <form className="flex flex-col w-2/3 mb-4">
        <input type="text" name="id" placeholder="아이디를 입력해주세요" />
        <input
          type="password"
          name="pw"
          placeholder="비밀번호를 입력해주세요"
        />
        <input type="submit" value="로그인" className=" bg-slate-500" />
      </form>
      <div className="text-center">
        <div className="flex justify-start">
          <div className="mr-20 ">구글 간편 로그인</div>
          <div className=" "> 이미지</div>
        </div>
        <div className="flex justify-center">
          <div className="mr-10 ">이메일로 회원가입하기</div>
          <button className=" ">회원가입 버튼</button>
        </div>
      </div>
    </div>
  );
}

export default App;
