import React, { useCallback, useEffect, useRef, useState } from 'react'
import Custom01 from './Custom01';

//! 커스텀 훅 부분

// 게시물에 필요한 객체들 타입 정의
interface PostType {
    id: number;
    author: string;
    date: string;
    title: string;
    content: string;
};

//# 커스텀 훅 생성
const usePosts = () => {
    //# 상태 관리
    // 포스트 목록 상태 관리
    const [posts, setPosts] = useState<PostType[]>([]);
    // 로딩 상태 관리
    const [loading, setLoading] = useState<boolean>(false);
    // 에러 상태 관리
    const [error, setError] = useState<string | null>(null);

    //# 처음 마운트 시 데이터를 가져올 부수효과
    useEffect(() => {
        try {
            setLoading(true);

            setTimeout(() => {
                setPosts([
                    { id: 1, author: '송혜교', date: '2024-06-11', title: '게시물 1', content: '리액트 커스텀 훅1' },
                    { id: 2, author: '임윤아', date: '2024-06-11', title: '게시물 2', content: '리액트 커스텀 훅2' },
                    { id: 3, author: '김유정', date: '2024-06-11', title: '게시물 3', content: '리액트 커스텀 훅3' },
                    { id: 4, author: '나나', date: '2024-06-11', title: '게시물 4', content: '리액트 커스텀 훅4' },
                    { id: 5, author: '수지', date: '2024-06-11', title: '게시물 5', content: '리액트 커스텀 훅5' }
                ]);
                setLoading(false);
            }, 1000);
        } catch(error) {
            setError((error as Error).message);
        }
    }, []);
    //* 처음 작성 시에 useState 에러 상태 관리에 setError를 사용하지 않아 노란 경고가 계속 떠 있어서
    //* try-catch문을 추가하여 에러를 잡아내는 것으로 로직을 변경하여 경고를 없앴다.

        // 게시물 생성 로직
        const addPost = useCallback((post: PostType) => {
            setPosts(prev => [...prev, {...post}]);
        }, []);

        // 게시물 수정 로직
        const updatePost = useCallback((updatePost: PostType) => {
            setPosts(prev => prev.map(post => post.id === updatePost.id ?
                updatePost : post
            ));
        }, []);

        // 게시물 삭제 로직
        const deletePost = useCallback((id: number) => {
            setPosts(prev => prev.filter(post => post.id !== id));
        }, []);

        return {posts, loading, error, addPost, updatePost, deletePost};
};

//! 메인 컴포넌트 영역
export default function Reason() {
    // 커스텀 훅 호출하면서 반환시킨 객체들 구조분해할당
    const {posts, loading, error, addPost, updatePost, deletePost} = usePosts();

    // 선택된 포스트 상태 관리
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

    // 인풋 창의 값을 관리할 커스텀 훅 호출하고 할당해주기
    const titleInput = Custom01('');
    const contentInput = Custom01('');

    // 새 포스트의 id를 참조하여 생성할 변수
    const postIdRef = useRef(5);

    //# 함수들 정의
    // 포스트 추가하는 함수
    const handleAddPost = (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPost = {
            id: postIdRef.current++,
            author: '작성자',
            date: new Date().toISOString().slice(0, 10),
            title: titleInput.value,
            content: contentInput.value
        };

        addPost(newPost);

        titleInput.reset();
        contentInput.reset();
    };

    // 포스트 수정 함수
    const handleUpdatePost = (post: PostType) => {
        updatePost({
            ...post,
            title: '수정된 제목',
            content: '수정된 내용'
        });
    };

    // 포스트 삭제 함수
    const handleDeletePost = (id: number) => {
        deletePost(id);
    };

    // 포스트 선택 함수
    const handleSelectPost = (post: PostType) => {
        setSelectedPost(post);
    };

  return (
    <div>
        {loading && <p>로딩중입니다...</p>}
        {error && <p>에러 발생 : {error}</p>}

        <form onSubmit={handleAddPost}>
            <input 
                type="text"
                {...titleInput.bind}
                placeholder='제목을 입력하세요.' 
            />
            <textarea 
                {...contentInput.bind}
                placeholder='내용을 입력하세요.'
            />
            <button type='submit'>게시물 등록</button>
        </form>

        <br />

        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    {post.title} by {post.author} on {post.date}
                    <button onClick={() => handleSelectPost(post)}>게시물 확인</button>
                    <button onClick={() => handleUpdatePost(post)}>게시물 수정</button>
                    <button onClick={() => handleDeletePost(post.id)}>게시물 삭제</button>
                </li>
            ))}
        </ul>

        {selectedPost && (
            <div>
                <h3>{selectedPost.title}</h3>
                <p>{selectedPost.content}</p>
            </div>
        )}
    </div>
  )
}
