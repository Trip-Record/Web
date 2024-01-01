// RegisterPage.tsx
import React, { useState } from 'react';

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handlePasswordMatch = () => {
    if (password !== confirmPassword) {
      alert('입력한 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 회원가입 로직을 처리하는 부분
    console.log('회원가입 정보:', { email, username, password, name, age });
  };

  return (
    <div className="flex flex-col w-1/2 h-1/2 m-auto mt-10 items-center bg-blue-600 text-center rounded-lg text-white">
      <h1 className="text-3xl mb-4 mt-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 w-2/3 mb-3">
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="mb-2 mt-2 text-left flex justify-between">
            이메일
            <input
              type="text"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              className="w-3/4 h-10 border-2 text-black p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>  
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="username" className="mb-2 mt-2 text-left flex justify-between">
            아이디
            <input
              type="text"
              id="username"
              name="username"
              placeholder="아이디를 입력해주세요."
              className="w-3/4 h-10 border-2 text-black p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>  
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password" className="mb-2 mt-2 text-left flex justify-between">
            비밀번호
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 8자 이상 입력해주세요"
              className="w-3/4 h-10 border-2 text-black p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>  
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="confirmPassword" className="mb-2 mt-2 text-left flex justify-between">
            비밀번호 확인
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="w-3/4 h-10 border-2 text-black p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handlePasswordMatch}
            />
          </label>  
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="mb-2 mt-2 text-left flex justify-between">
            사용자 이름
            <input
              type="text"
              id="name"
              name="name"
              placeholder="OO에서 사용하실 이름을 입력해주세요"
              className="w-3/4 h-10 border-2 text-black p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>  
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="age" className="mb-2 mt-2 text-left flex justify-between">
            나이
            <select
              id="age"
              name="age"
              className="w-3/4 h-10 border-2 p-2"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ color: 'black' }}
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
          </label>  
        </div>
        <input type="submit" value="회원가입" className="bg-lime-200 h-10 mt-2 mb-2" style={{ color: 'black' }} />
      </form>
    </div>
  );
};

export default RegisterPage;
