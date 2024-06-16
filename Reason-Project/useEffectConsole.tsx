import React, { useEffect, useState } from 'react'

//# 자식 
// 커스텀 생성 & 정의
const useCounter = () => {
    // 카운트 상태 관리
    const [count, setCount] = useState(0);

    // 함수들 정의
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    // 객체들 반환
    return {count, increment, decrement};
};

//# 메인
export default function FollowM() {
    // 반환 객체들 가져오기
    const {count, increment, decrement} = useCounter();

    //* 수정> 액션별로 호출하는 함수 정의
    const handleEvent = (action: () => void) => {
        action();
    };
    
    //* 추가> 
    useEffect(() => {
        console.log(`현재 카운트 상태 : ${count}`);
    }, [count]);
    //& useEffect 훅을 사용하여 count 상태가 변경될 때마다 콘솔에 로그를 출력
    //& 이로 인해 상태가 변경될 때마다 최신 상태가 콘솔에 출력된다.

  return (
    <div>
        <button onClick={() => handleEvent(increment)}>+</button>
        <button onClick={() => handleEvent(decrement)}>-</button>
        <p>Count : {count}</p>
    </div>
  )
}
