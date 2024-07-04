import axios from 'axios';
import React, { useRef, useState } from 'react'

// 유저 객체 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
};

export default function Axios03() {
  // 추가되는 유저 상태 관리
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    email: ''
  });

  //* 사용자 배열 상태 관리
  const [users, setUsers] = useState<User[]>([]);

  //* 생성되는 사용자 id 추적
  const idRef = useRef(11);

  // 입력 상태 값 변경 감지 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  //* 사용자 추가 함수
  const handleAddUser = () => {
    setNewUser({...newUser, id: idRef.current++})
    setUsers([...users, newUser]);
  };

  // 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      console.log('추가된 사용자 : ', response.data);

      alert('사용자가 추가되었습니다.');

      //* 사용자 추가 함수 호출
      handleAddUser();

      //* 입력란 사용 후 비워주기
      setNewUser({
        id: 0,
        name: '',
        email: ''
      });
    } catch(error) {
      alert('사용자 추가가 실패하였습니다.' + (error as Error).message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label> 이름 : 
          <input 
            type="text"
            name='name'
            value={newUser.name}
            onChange={handleInputChange} 
          />
        </label>
        <label> 이메일 : 
          <input 
            type="email"
            name='email'
            value={newUser.email}
            onChange={handleInputChange} 
          />
        </label>
        <button type='submit'>사용자 추가</button>
      </form>

      {/* //* 추가된 사용자들 목록 나열하기 */}
      {users.map(user => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </>
  )
}