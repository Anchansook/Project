import React, { useState } from 'react'

export default function Follow(initialValue: string) {
  // 인풋 창 상태 관리
  const [value, setValue] = useState<string>(initialValue);

  // 인풋 내용 받아오는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleInputChange,
    //* 값 초기화를 위한 리셋 함수
    // 따로 정의할 필요가 없음.
    reset: () => setValue('')
  };
}
