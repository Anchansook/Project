import React, { useCallback, useState } from 'react'

export default function Follow() {
  // 카운터 상태 관리
  const [count, setCount] = useState<number>(0);

  //! 메모이제이션 될 함수
  //% 1.
  const prevIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, []);
  //% useCallback을 사용해서 함수를 메모이제이션하는데,
  //% 현 로직에서는 빈 배열이기에 마운트 될때만 함수를 생성,
  //% 그래서 이전 값을 가져와서 이전값에 +1을 해줘야 더해진다.
  //% 그냥 카운터에 +1을 하면 마운트 될때만 함수를 생성했기 때문에
  //% 버튼을 눌러도 값이 변하지 않는다.

  //* 2.
  const countIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  //* 그냥 카운터에 +1을 할 때에는 빈 배열이면 마운트 될 때만 함수를 생성하여
  //* 카운터가 늘지 않는다.
  //* 종속성 배열에 count를 넣어서 count가 변할 때마다 함수가 생성되도록 해주면,
  //* 카운터가 올라갈 때마다 함수를 생성하여 카운팅이 된다.

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={prevIncrement}>prevUP</button>
      <button onClick={countIncrement}>countUP</button>
    </div>
  )
}
