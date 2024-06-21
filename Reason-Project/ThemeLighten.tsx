import { darken, lighten } from 'polished';
import React from 'react'
import styled, { ThemeProvider } from 'styled-components';

//# 전역 테마 설정
// 객체 구조로 정의
const globalTheme = {
  colors: {
    primary: '#007bff',
    secondery: '#6c757d',
    success: '#28a745',
    danger: '#dc3545'
  },
  fonts: {
    large: '20px',
    medium: '16px',
    small: '12px'
  }
};

// Button 컴포넌트에 사용할 props 타입 정의
interface ButtonProps {
  color: keyof typeof globalTheme.colors;
};

// Button 스타일 컴포넌트 정의
const Button = styled.button<ButtonProps>`
  color: 'white';
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.theme.colors[props.color] || '#000'};
  font-size: ${props => props.theme.fonts.large};
  &:hover {
    background-color: ${props =>
    darken(0.1, props.theme.colors[props.color] || '#000')};
  }
  //* 추가
  &:active {
    background-color: ${props =>
    lighten(0.1, props.theme.colors[props.color] || '#fff')};
  }
`;

export default function Follow() {
  return (
    <>
      <ThemeProvider theme={globalTheme}>
        <Button color='success'>Success Button</Button>
        <Button color='danger'>Danger Button</Button>
      </ThemeProvider>
    </>
  )
}
