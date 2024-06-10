import React, { useState } from 'react'

// 반환할 객체들 타입 정의
interface UseInputReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
  bind: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }
};

export default function Follow(initialValue: string): UseInputReturn {
  // 입력 상태를 관리
  const [value, setValue] = useState(initialValue);

  // 입력 필드의 값이 바뀔 때 호출하는 이벤트 핸들러 정의
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // 입력 필드의 값을 초기화하는 함수 정의
  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    setValue,
    reset,
    bind: {
      value,
      onChange: handleChange
    }
  };
}
