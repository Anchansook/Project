import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// 포스트를 이루는 객체들 인터페이스로 타입 정의
export interface Post {
    id: number;
    title: string;
    body: string;
};

export default function BlogPost() {
    // 각각의 포스트의 id 파라미터 값 추출
    const { postId } = useParams();

    // 포스트 상태 관리
    const [post, setPost] = useState<Post | null>(null);

    //* 네비게이트 정의 - 뒤로가기
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    // 포스트 id에 따라 비동기로 데이터 가져오는 이펙트 함수
    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            setPost(response.data);
        };
        fetchPost();
    }, [postId]);

  return (
    <>
        <h2>Blog Post Details</h2>
        {post ? (
            <>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </>
        ) : <p>loading...</p>}
        {/* //* 뒤로가기 버튼 추가 */}
        <button onClick={goBack}>뒤로가기</button>
    </>
  )
}
