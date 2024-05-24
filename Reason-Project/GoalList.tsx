import React from 'react'

//! 목표 항목 컴포넌트

// 목표 정의 인터페이스
interface Goal {
  id: number;
  title: string;
  explanation: string;
  active: boolean;
};

// GoalList 컴포넌트의 props를 정의하는 인터페이스
interface GoalProps {
  goals: Goal[],
  // 목표 삭제 함수, 목표의 id를 인자로 전달
  onRemove: (id: number) => void;
  // 목표 활성 상태 토글 함수, 목표의 id를 인자로 전달
  onToggle: (id: number) => void;
};

export default function GList({goals, onRemove, onToggle}: GoalProps) {
  return (
    <>
      {/* goals 배열을 map으로 순회 - 각 목표의 정보를 렌더링 */}
      {goals.map(goal => (
        // 각 목표를 정의 - key 속성 (각 목표를 고유하게 식별)
        <div key={goal.id}> 
          {/*  
            목표의 제목과 설명을 표시
            : 클릭할 경우 '해당 목표'의 활성 상태가 토글
          */}
          <span
            style={{
              cursor: 'pointer',
              color: goal.active ? 'pink' : 'gray',
              textDecoration: goal.active ? 'none' : 'line-through',
              fontStyle: goal.active ? 'none' : 'italic' 
            }}
            onClick={() => onToggle(goal.id)}
          >
            {goal.title} - {goal.explanation}
          </span>
          {/* 목표 삭제 버튼 - 클릭 시 onRemove 함수 호출 */}
          <button onClick={() => onRemove(goal.id)}>삭제</button>
        </div>
      ))}
    </>
  )
}
