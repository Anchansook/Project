import React, { useMemo, useState } from 'react'

//! 콜백 함수 예시
// ex) 계산 비용이 높은 함수
function expensiveCalculation (num: number) {
    console.log('계산 중');
    return num * num;
};

export default function Follow() {
    // 인자 num 상태 관리
    const [num, setNum] = useState<number>(5);

    // useMemo 사용 
    const squaredNumber = useMemo(() => {
        return expensiveCalculation(num);
    }, []);
    //# 의존성 배열을 빈 배열로 하여 마운트 될 때의 값을 메모이제이션
    //* 증가 버튼을 아무리 눌러도 처음 값만 기억하고 재계산을 하지 않는다.
    //* 처음 메모이제이션을 한 값만 유지(반환)
    //* 빈 배열을 사용함으로써 메모이제이션 기능을 확인.

  return (
    <div>
        <h4>제곱의 수는 {squaredNumber} 입니다.</h4>
        <button
            onClick={() => setNum(num + 1)}
        >num 증가</button>
        <p>{squaredNumber}</p>
    </div>
  )
}
