import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Axios01() {
  //* 유저 상태 관리
  const [users, setUsers] = useState<User[]>([]);
  //* 추가하는 유저 상태 관리
  const [newUser, setNewUser] = useState<User | null>(null);

  // axios를 사용한 get 요청 (가져오다.)
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')

      setUsers(response.data);
    } catch(error) {
      console.error('Fetching Error : ', error);
    }
  };

  // axios를 사용한 post 요청 (생성하다, 전송하다.)
  // 생성할 유저 인터페이스 정의
  interface User {
    id: number;
    name: string;
    email: string;
  };

  // 사용자를 추가하는 로직 - post (전송, 생성)
  const addUser = async (user: User) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user)

      setNewUser(response.data);
    } catch(error) {
      console.error('Adding Error : ', error);
    }
  };

  //* 처음 마운트될 때 데이터를 가져오고 새 유저도 넣는 함수
  useEffect(() => {
    fetchUsers();

    addUser({
      id: 1,
      name: 'latte',
      email: 'latte@naver.com'
    });
  }, []);

  return (
    <div>
      <h2>Fetch & Post</h2>
      <h3>Fetch Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.id} - {user.name} - {user.email}
          </li>
        ))}
      </ul>

        <h3>Post Users</h3>
        {newUser && (
          <ul>
            <li>
              {newUser.id} - {newUser.name} - {newUser.email}
            </li>
          </ul>
        )}
    </div>
  )
}
