import React, { useReducer } from 'react'

//# 게임 상태 정의
type GameState = {
  player: {
    name: string;
    level: number;
    item: {
      potion: number;
      coins: number;
      equipment: {
        armor: string;
        weapon: string;
      }
    }
  },
  enemies: number;
  gameStatus: string;
};

//# 게임 상태 초기값 설정
const initialValue: GameState = {
  player: {
    name: '안찬숙',
    level: 4,
    item: {
      potion: 10,
      coins: 5000,
      equipment: {
        armor: '투명망토',
        weapon: '화살',
      }
    }
  },
  enemies: 30,
  gameStatus: 'Active'
};

//# 액션 타입 정의
type Action = 
  {type: 'LEVEL_UP'} 
  | {type: 'LEVEL_DOWN'} 
  | {type: 'USE_POTION'} 
  | {type: 'ADD_POTION'} 
  | {type: 'CHANGE_WEAPON', weapon: '화살' | '단검'};
  //* 타입 'CHANGE_WEAPON'에 추가로 weapon을 따로 빼서 또 타입 정의

//# gameReducer 함수 정의
const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'LEVEL_UP' :
      return {
        ...state,
        player: {
          ...state.player,
          level: state.player.level + 1
        }
      };
    case 'LEVEL_DOWN' :
      return {
        ...state,
        player: {
          ...state.player,
          level: state.player.level - 1
        }
      };
    case 'USE_POTION' :
      if (state.player.item.potion > 0) {
        return {
          ...state,
          player: {
            ...state.player,
            item: {
              ...state.player.item,
              potion: state.player.item.potion - 1
            }
          }
        }
      }
      return state;
    case 'ADD_POTION' :
        return {
          ...state,
          player: {
            ...state.player,
            item: {
              ...state.player.item,
              potion: state.player.item.potion + 1
            }
          }
        };
    //* 기존은 똑같이 스프레드 쓰면서 가져오다가
    //* 바꿔줄 weapon 부분에 action.weapon으로 위에서 지정해준 타입 넣어주기
    case 'CHANGE_WEAPON' :
      return {
        ...state,
        player: {
          ...state.player,
          item: {
            ...state.player.item,
            equipment: {
              ...state.player.item.equipment,
              weapon: action.weapon
            }
          }
        }
      }
    default :
      throw new Error('[ERROR] Unknown action error');
  }
};

export default function Follow() {
  const [state, dispatch] = useReducer(gameReducer, initialValue);

  //* 따로 토글 함수를 생성
  //* 상태를 바꿔주는 dispatch함수에 타입과 
  //* 세부 타입 설정 weapon을 넣어줌 (값을 토글해주는 내용을 넣은 변수명 입력)
  const toggleWeapon = () => {
    const newWeapon = state.player.item.equipment.weapon === '화살' ? '단검' : '화살';
    dispatch({type: 'CHANGE_WEAPON', weapon: newWeapon});
  };

  return (
    <div>
      <h1>GAME STATUS</h1>
      <h2>Character: {state.player.name} - Lovel: {state.player.level}</h2>
      <h3>Potion: {state.player.item.potion}</h3>
      <h3>Weapon: {state.player.item.equipment.weapon}</h3>

      <button onClick={() => dispatch({type: 'LEVEL_UP'})}>Level Up</button>
      <button onClick={() => dispatch({type: 'LEVEL_DOWN'})}>Level Down</button>

      <button onClick={() => dispatch({type: 'USE_POTION'})}>
        Use Potion <b>{state.player.item.potion}</b>
      </button>
      <button onClick={() => dispatch({type: 'ADD_POTION'})}>
        Add Potion
      </button>

      {/* 클릭이벤트로 정의해준 토글함수 넣어주기 */}
      <button onClick={toggleWeapon}>
        Change Weapon
      </button>
    </div>
  )
}
