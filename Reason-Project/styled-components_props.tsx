import React from 'react'
import styled from 'styled-components';

//# 기본 사용법
// 버튼 스타일 생성
const Button = styled.button`
    background-color: green;
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: darkgreen;
    }
`;

//# 프롭스(props)를 활용한 동적 스타일링
interface ButtonProps {
    primary?: boolean;
};

const PropsButton = styled.button<ButtonProps>`
    background-color: ${props => props.primary ? 'navy' : 'gray'};
    color: white;
    padding: 10px;
    border-radius: 5px;
    &:hover {
        background-color: ${props => props.primary ? 'blue' : 'darkgray'};
    }
`;

//* 추가 스타일 
interface H3Props {
    primary?: boolean;
};

const Reason = styled.h3<H3Props>`
    text-align: center;
    color: ${props => props.primary ? 'hotpink' : 'gray'};
    background-color: ${props => props.primary ? 'black' : 'yellow'};
    text-decoration: ${props => props.primary ? 'underline' : 'line-through'};
    border: 5px solid red;
    &:hover {
        padding: ${props => props.primary ? '10px 0' : '30px 0'};
        border-radius: ${props => props.primary ? '20px' : '50px'};
    }
`;

//# 글로벌 스타일 적용
export default function Style03() {
  return (
    <div>
        <Button>스타일드 컴포넌트로 구현하는 버튼</Button>
        <PropsButton>프롭스를 사용하는 스타일드 컴포넌트 버튼</PropsButton>
        <PropsButton primary>프롭스를 사용하는 스타일드 컴포넌트 버튼</PropsButton>

        <br />

        {/* 추가 */}
        <Reason>연습!! 연습!!</Reason>
        <Reason primary>연습!! 연습!!</Reason>
    </div>
  )
}
