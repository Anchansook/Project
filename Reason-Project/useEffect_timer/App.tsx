import React, { useState } from 'react'
import Timer from './Timer';

export default function App() {
    const [showTimer, setShowTimer] = useState(false);

  return (
    <div>
        {showTimer && <Timer />}
        <button onClick={() => setShowTimer(!showTimer)}>button</button>
    </div>
  )
}

// 논리 연산자 사용
// : showTimer가 true 일 때, 타이머 컴포넌트가 활성화

// 버튼 요소 생성
// : 클릭 했을 때 showTimer의 상태가 토글 (반대의 상태)