import React, { useCallback, useState } from 'react'

export default function Follow() {
  // input value 상태 관리
  const [value, setValue] = useState<string>('');

  //# form을 제출하면서 input의 값을 콘솔에 전달하는 함수
  const handleChangeForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`제출된 내용 ${value}`);

    setValue('');
  }, [value]);
  /*
  & 기존 로직에서 따로 form과 input을 나눠서 함수를 작성

  ? 폼이 제출되면서 렌더링 되는 부분을 preventDefault() 함수를 적용하여 기본동작을 방지하고,
  ? 그러므로 인해 제출되면 발생하는 렌더링을 막았기 때문에 따로 input창을 비워주는 로직을 작성함
  ? 콘솔에 input에 작성한 내용을 확인하기 위해 value 상태를 넣어줌
  ? 근데 그냥 콘솔에만 넣으면 보이지 않았음. 의존성배열에도 value를 넣어주니 확인이 되었음.
  * 그렇게 해야 value가 변경될 때마다 handleChangeForm함수가 재생성되어 최신 value값을 참조할 수 있음.
  */

  //# input의 내용을 바꾸는 함수
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  //* 그냥 기본 함수에서 useCallback 사용하여 최적화 함수로 로직 변경

  return (
    <div>
      <form onSubmit={handleChangeForm}>
        <input 
          type="text"
          value={value} 
          onChange={handleChange}
        />
        <button type='submit'>제출</button>
      </form>
    </div>
  )
}
