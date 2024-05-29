import React, { useEffect, useMemo, useState } from 'react'

export default function Follow() {
  // 사과 수 상태 관리
  const [count, setCount] = useState<number>(0);

  // 사과 종류 상태 관리
  const [isApple, setIsApple] = useState<boolean>(true);

  // useMemo 사용
  const apple = useMemo(() => {
    return {
      yamApple: isApple ? 'redApple' : 'greenApple'
    }
  }, [isApple]);

  // useEffect 사용
  useEffect(() => {
    console.log('무슨 사과');
  }, [apple]);

  return (
    <div>
      <h2>사과가 몇 개 있나요?</h2>
      <input 
        type="number"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))} 
      />

      <hr />

      <h2>무슨 사과인가요?</h2>
      <h4>무슨 사과? {apple.yamApple}</h4>
      <button onClick={() => setIsApple(!isApple)}>바꾸자</button>
    </div>
  )
}
