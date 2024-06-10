import React, { useState } from 'react'
import Follow from './Follow';

// 게시판에 들어갈 객체들 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
};

export default function Follow_M() {
  // 커스텀 훅을 호출하면서
  // 제목 입력을 관리하는 훅
  const {value: title, bind: bindTitle, reset: resetTitle} = Follow('');
  // 내용 입력을 관리하는 훅
  const {value: content, bind: bindContent, reset: resetContent} = Follow('');

  // 게시글 목록의 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);

  // 게시글을 추가하는 함수
  const addPost = () => {
    // 둘 다 입력되어있는 지 확인
    if (!title || !content) {
      alert('둘 다 내용을 입력해주세요.');
      return;
    }

    // 새 포스터를 생성하기 위한 새포스터 객체 정의
    const newPost = {
      id: posts.length + 1,
      title,
      content
    };

    // 기존 포스터에 새 포스터를 추가
    setPosts([...posts, newPost]);

    // 입력 필드 초기화
    resetTitle();
    resetContent();
  };

  //# 게시글 삭제 버튼 함수
  const postDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };
  // 인자로 id를 받아오고, 상태를 변경하는 게시글 목록의 업데이트 함수에
  // 필터링을 해서 각각의 포스트를 순회하면서 기존 id와 선택한 id가 다른 아이템들만
  // 배열 재생성

  return (
    <div>
      <h2>미니 게시판</h2>
      <div className='input-container'>
        <input 
          type="text"
          placeholder='제목을 입력하세요.'
          {...bindTitle} 
        />

        <br />

        <textarea
          placeholder='내용을 입력하세요.'
          {...bindContent}
        />
        <button onClick={addPost}>게시글 추가</button>
      </div>
      <div className='post'>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* 게시글을 생성하는 로직 안으로 게시글 바로 아래로 버튼을 생성해야 함! */}
            <button onClick={() => postDelete(post.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}
