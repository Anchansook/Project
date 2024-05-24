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
              fontWeight: goal.active ? 700 : 0,
              textDecoration: goal.active ? 'none' : 'line-through',
              fontStyle: goal.active ? 'normal' : 'italic'
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

//* list의 순번대로 번호가 나오게 하기 위해선
// >> 처음부터 ol로 감싸서 작성해야 한다.

//* fontStyle 에서 아무 형태도 주지 않으려면
// >> normal을 써야 한다.
