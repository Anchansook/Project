import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

// 유저 객체 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
};

export default function Axios02() {
  // 요청해서 가져오는 유저 상태 관리
  const [users, setUsers] = useState<User[]>([]);
  // 요청 중 발생하는 에러 상태 관리
  const [error, setError] = useState<string>('');
  //* 새 유저 추가를 위한 인풋창 상태 관리
  const [inputUser, setInputUser] = useState<User>({
    id: 0,
    name: '',
    email: ''
  });

  //* 추가되는 유저 아이디 상태 추적
  const userIdRef = useRef(11);

  // 마운트 시 비동기로 유저의 데이터 가져오는 함수
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch(error) {
        setError((error as Error).message);
      }
    };
    fetchUsers();
  }, []);

  //* 입력란 값 변경 감지해서 바꿔주는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setInputUser({
      ...inputUser,
      [name]: value
    });
  };

  //* 유저 추가하는 함수(공통 사용)
  const addUser = () => {
    const newUser = {...inputUser, id: userIdRef.current++};
    setUsers([...users, newUser]);
    setInputUser({
      id: 0,
      name: '',
      email: ''
    });
  };

  //* 버튼 & 엔터키로 유저 추가하는 함수
  const handleButtonAdd = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addUser();
  };

  const handleKeyAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addUser();
    }
  };

  return (
    <div>
      <h2>HTTP - GET / Fetch Users</h2>
      {error ? (
        <div>Error : {error}</div>
      ) : users.map(user => (
        <div key={user.id}>
          {user.id} - {user.name} - {user.email}
        </div>
      ))}

      {/* //* 인풋 입력란 작성으로 유저 데이터 추가 */}
      <h2>HTTP - POST / Add users</h2>
      <input 
        type="text"
        name='name'
        value={inputUser.name}
        placeholder='name'
        onChange={handleInputChange}
        onKeyDown={handleKeyAdd} 
      />
      <input 
        type="text"
        name='email'
        value={inputUser.email}
        placeholder='email'
        onChange={handleInputChange}
        onKeyDown={handleKeyAdd} 
      />
      <button onClick={handleButtonAdd}>add</button>
    </div>
  )
}
