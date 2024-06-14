import React, { useState } from 'react'

export default function Follow() {
  // 인풋 창 상태 관리
  const [value, setValue] = useState('');

  // 인풋 창 관리 함수 정의
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 조건부 폼 함수 정의
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    // form 이벤트 기본동작 방지
    e.preventDefault();

    //* 조건부
    // 입력란에 내용이 없다면 콘솔에 내용을 입력해주세요 출력
    // , 있다면 제출 & 콘솔에 내용 출력
    if (value === '') {
      console.log('내용을 입력해주세요.');
    } else {
      console.log(`제출 내용: ${value}`);
    }

    // 제출 후 input창 비워주기
    setValue('');
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input 
          type="text"
          value={value}
          onChange={handleInput} 
        />
        <button type='submit'>제출</button>
      </form>
    </div>
  )
}
