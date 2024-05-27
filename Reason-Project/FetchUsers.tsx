import React, { useEffect, useState } from 'react'

// 사용자 유저 타입 정의
type User = {
    id: number;
    name: string;
    email: string;
};

export default function Follow() {
    // 유저 상태 관리
    const [users, setUsers] = useState<User[]>([]);

    // 로딩 상태 관리
    const [loading, setLoading] = useState<boolean>(true);

    // 에러 상태 관리
    const [error, setError] = useState<string | null>(null);

    // 비동기로 유저 데이터 가져오기
    async function fetchUsers () {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error(`HTTP Error! status : ${response.status}`);
            }

            const data = await response.json();

            setUsers(data);

            setLoading(false);
        } catch(error) {
            setError((error as Error).message);
            setLoading(false);
        }
    };

    // 컴포넌트가 마운트될 때 사용자 데이터 가져오기 함수 호출
    useEffect(() => {
        fetchUsers();
    }, []);

    // 로딩 중일 때 표시
    if (loading) {
        return <div>사용자 로딩중입니다.</div>
    }

    // 에러 났을 때 표시
    if (error) {
        return <div>Error : {error}</div>
    }

  return (
    <div>
        <h2>User 사용자 데이터</h2>

        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </li>
            ))} 
        </ul>
    </div>
  )
}
