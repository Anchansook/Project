import axios from 'axios';
import React, { useEffect, useState } from 'react'

//# HTTP - PATCH로 부분 수정

// 사용자 객체 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
};

export default function Axios04() {
  //# 상태 관리
  // 사용자 데이터 목록 상태 관리
  const [users, setUsers] = useState<User[]>([]);
  // 수정할 id 상태 관리
  const [edintingId, setEditingId] = useState<number | null>(null);
  // 수정 내용 상태 관리
  const [formState, setFormState] = useState<{name: string; email: string;}>({
    name: '',
    email: ''
  });

  //# 함수들 정의
  // 첫 렌더링, 마운트 시 사용자 목록 호출하는 비동기 함수 - GET
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log('가져온 사용자 데이터 목록 : ', response.data);
        setUsers(response.data);
      } catch(error) {
        console.error('가져오는 중 에러 발생 : ' + (error as Error).message);
      }
    };
    fetchUsers();
  }, []);

  // 데이터 삭제할 때 호출되는 함수
  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(item => item.id !== id));
    } catch(error) {
      console.error('삭제 중 에러 발생 : ', error);
    }
  };

  // 수정 버튼 클릭 시 호출되는 함수
  const handleEditClick = (id: number) => {
    const item = users.find(item => item.id === id);

    if(item) {
      setFormState({name: item.name, email: item.email});
      setEditingId(id);
    }
  };

  // 폼 입력 변경 시 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // 폼 제출 시 호출되는 함수
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (edintingId !== null) {
      try {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/users/${edintingId}`, formState);
        console.log('수정된 내용: ', response.data);
        const updateItem = response.data;

        setUsers(users.map(item => item.id === edintingId ? updateItem : item));
        // 편집 모드 종료
        setEditingId(null);
      } catch(error) {
        console.error('수정 중 에러 발생 : ' + (error as Error).message);
      }
    }
  };

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {users.map(item => (
          <li key={item.id}>
            {item.id} - {item.name} - {item.email}
            <button onClick={() => handleEditClick(item.id)}>수정 버튼</button>
            <button onClick={() => handleDeleteItem(item.id)}>삭제 버튼</button>
          </li>
        ))}
      </ul>

        {/* 
          수정할 id가 null이 아닐 때, 즉 수정할 아이템을 선택했을 때만 수정할 input입력란과 저장 버튼이 보이도록 
        */}
      {edintingId !== null && (
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text"
            name='name'
            value={formState.name}
            onChange={handleInputChange}
            placeholder='이름'
          />
          <input 
            type="email"
            name='email'
            value={formState.email}
            onChange={handleInputChange}
            placeholder='이메일'
          />
          <button type='submit'>저장하기</button>
        </form>
      )}
    </div>
  )
}
