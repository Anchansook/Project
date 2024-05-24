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
  goals: Goal[];
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function GList({goals, onRemove, onToggle}: GoalProps) {
  return (
    <>
      <ol>
        {goals.map(goal => (
          <li 
            key={goal.id}
            style={{
              cursor: 'pointer',
              color: goal.active ? 'black' : 'gray',
              fontWeight: goal.active ? '600' : '0',
              textDecoration: goal.active ? 'none' : 'line-through',
              fontStyle: goal.active ? 'none' : 'italic'
            }}
            onClick={() => onToggle(goal.id)}
          >
            {goal.title} - {goal.explanation}
            <button onClick={() => onRemove(goal.id)}>삭제</button>
          </li>
        ))}
      </ol>
    </>
  )
}

// 리스트 번호로 주려고 ol로 바꿨지만 나오지 않았다.
// 완전 처음 부터 ol로 감싸고 로직을 시작해야 한다.
// >> 그러니 순번대로 숫자가 나왔다.
