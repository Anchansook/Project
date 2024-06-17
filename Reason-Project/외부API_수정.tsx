import React, { useState } from 'react'

// 게시물의 타입 정의
type Post = {
    userId: number;
    postId: number;
    title: string;
    body: string;
};

export default function FollowM() {
    // 게시물 & 게시물 id 상태 관리
    const [post, setPost] = useState<Post | null>(null);
    const [postId, setPostId] = useState('');

    // 데이터를 가져오는 비동기적 함수
    // const fetchPost = async () => {
    //     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    //     const data = await response.json();
    //     setPost(data);
    // };

    //* try-catch문으로 변경
    //* + id 입력란 검색 후 비워주기
    const fetchPost = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await response.json();
            setPost(data);
            setPostId('');
        } catch(error) {
            throw new Error((error as Error).message);
        }
    };

  return (
    <div>
        {/* 게시물 로드 */}
        <input 
            type="text"
            value={postId}
            placeholder='게시물 id 입력'
            onChange={(e) => setPostId(e.target.value)}
        />
        <button onClick={fetchPost}>게시물 로드</button>

        {/* post 값이 있을 경우 내용 출력 & 없으면 낫로드 문구 출력 */}
        <div>
            {post ? (
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ) : (
                <p>No data loaded</p>
            )}
        </div>

        {/* post 내용이 있을 경우에만 출력 */}
        <div>
            {post && (
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            )}
        </div>
    </div>
  )
}
