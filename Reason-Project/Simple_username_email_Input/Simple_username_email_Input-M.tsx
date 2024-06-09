import React, { useEffect, useMemo, useReducer } from 'react'
import Follow from './Follow';

// 사용자 입력 값에 대한 상태 정의
interface FormState {
  name: string;
  email: string;
};

// 액션 타입 정의
type FormAction = 
  | {type: 'SET_NAME', payload: string}
  | {type: 'SET_EMAIL', payload: string};

// 액션에 따른 정의
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_NAME' :
      return {...state, name: action.payload};
    case 'SET_EMAIL' :
      return {...state, email: action.payload};
    default :
      throw new Error("정의되지 않은 액션.");
  }
};

export default function Follow_M() {
  // 정의 컴포넌트 호출해오기
  const nameInput = Follow('');
  const emailInput = Follow('');

  // useReducer 상태 관리
  const [formstate, dispatch] = useReducer(formReducer, {
    name: '',
    email: ''
  });

  // 인풋 내용이 바뀔 때마다 호출하는 함수
  useEffect(() => {
    dispatch({type: 'SET_NAME', payload: nameInput.value});
  }, [nameInput.value]);

  useEffect(() => {
    dispatch({type: 'SET_EMAIL', payload: emailInput.value});
  }, [emailInput]);

  // 상태가 바뀔 때마다 메모이제이션하고 내용 출력하는 함수
  const userInfo = useMemo(() => {
    return `${formstate.name} - ${formstate.email}`;
  }, [formstate]);

  //* 버튼 정의
  const handleSubmitButton = () => {
    alert(`submit: ${userInfo}`)
    nameInput.reset();
    emailInput.reset();
  };
  // 알림창 alert함수에 유저들 정보를 출력하는 함수를 인자로 넣어주고,
  // 각각 이름과 이메일 input에 리셋함수를 호출함. (input창 비우기)

  return (
    <div>
      <input 
        type="text"
        placeholder='user name'
        {...nameInput} 
      />
      <input 
        type="email"
        placeholder='user email'
        {...emailInput} 
      />
      <div>
        User : {userInfo}
      </div>
      {/* 정의 내린 버튼 함수를 클릭했을 때 발동하도록 넣어줌 */}
      <button onClick={handleSubmitButton}>제출</button>
    </div>
  )
}
