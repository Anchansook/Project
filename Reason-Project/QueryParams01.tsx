import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function QueryParams01() {
  // 쿼리 파라미터 상태 관리
  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리 파라미터 값 읽어오기
  const query = searchParams.get('query') || '';

  // input 내용 감지해서 쿼리 파라미터 값 바꾸는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    setSearchParams({query: newQuery});
  };

  //* 추가
  // enter키로 값 넘기는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchParams(query);
    }
  };
  //& 리액트의 키보드 이벤트를 받아올거고, 그 이벤트는 인풋요소에서 발생할거다.
  //& 만약에 이벤트의 키가 엔터라면 서치파람스의 업데이트 함수에 쿼리를 넣어준다.

  //* 추가 
  // form으로 검색어를 넘기는 함수
  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchParams('');
  };
  //& 리액트의 폼이벤트를 받아올거고, 그 이벤트는 인풋요소에서 발생할거다.
  //& 폼 이벤트의 기본 리렌더링을 방지하고, 서치파람스의 업데이트 함수를 폼으로 넘긴 후 비워준다.

  return (
    <div>
      {/* //* 추가 */}
      {/* //& 추가한 form을 만들어서 감싸주고 정의한 이벤트를 서브밋 속성에 넣어줌. */}
      <form onSubmit={() => handleForm}>
        <input 
          //& 타입도 서치로 바꿔줌.
          type="search" 
          value={query}
          onChange={handleInputChange}
          placeholder='검색어를 입력해주세요.'
          //& 위에서 정의한 엔터키로 내용을 넘기도록 정의한 함수를 넣어주고, 
          onKeyDown={handleKeyDown}
          //& 인풋창에 바로 포커스가 돼서 마우스를 클릭하지 않아도
          //& 내용 입력이 가능하도록 오토 포커스를 넣어줬다.
          autoFocus
        />
      </form>
      <p>Search Query : {query}</p>
    </div>
  )
}
