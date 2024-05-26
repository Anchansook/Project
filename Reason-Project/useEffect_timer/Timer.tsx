import React, { useEffect, useState } from 'react'

export default function Follow() {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(c => c + 1);
        }, 1000)

        return () => {
            clearInterval(timer);
            console.log('타이머 종료');
        }
    }, []);

  return (
    <div>
        타이머 : {count}
    </div>
  )
}
