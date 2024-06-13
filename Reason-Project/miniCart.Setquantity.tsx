import React, { useCallback, useState } from 'react'

//# 정의 컴포넌트
// 상품을 이루는 객체들 타입 정의
interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

//# 커스텀 훅
const useCart = () => {
  // 상품 목록 상태 관리
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  //# 함수 정의
  // 상품 추가 함수
  const addItem = useCallback((item: CartItemType) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(prevItem => prevItem.id === item.id);

      if (existingItem) {
        return prevItems.map(prevItem => prevItem.id === item.id ?
          { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    }
    );
  }, []);

  // 기존 상품 수량 수정 함수
  const updateItemQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 0) return;

    setCartItems(prevItems =>
      prevItems.map(prevItem => prevItem.id === id ?
        {...prevItem, quantity} : prevItem
      )
    );
  }, []);
  //& 처음에는 Math.max(0, prevItem.quantity - 1) 이 로직을 활용해보려 했지만
  //& 그냥 0으로만 계속 맞춰지고 그렇다고 연결해서 + 내용도 하려고 하니 로직을 더 만들어야 할 것 같고, 
  //& 한 곳에서 해결이 되지 않았음. 아래 브라우저 출력 리턴문에서도 시도하니 에러만 뜸
  //* 간단하게 수량이 0보다 작을 경우 아무 실행이 되지 않도록 리턴시켜버리고
  //* 나머지는 똑같은 로직을 작성. 0 밑으로 내려가지 않도록 설정이 되었다.


  // 상품 삭제 함수
  const removeItem = useCallback((id: number) => {
    setCartItems(prevItems => prevItems.filter(prevItem => prevItem.id !== id));
  }, []);

  return {cartItems, addItem, updateItemQuantity, removeItem};
};

//# 메인 컴포넌트
export default function Reason_m() {
  // 반환된 객체 가져오기
  const {cartItems, addItem, updateItemQuantity, removeItem} = useCart();

  // 상품 이름 & 가격 상태 관리
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // 상품 추가 함수
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새 상품 생성을 위한 새 상품 객체 정의
    const newItem = {
      id: Date.now(),
      name: name,
      price: Number(price),
      quantity: 1
    };

    addItem(newItem);

    setName('');
    setPrice('');
  };

  return (
    <div>
      <h2>미니 장바구니</h2>
      
      <form onSubmit={handleAddItem}>
        <input 
          type="text"
          value={name}
          placeholder='상품 이름'
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="number"
          value={price}
          placeholder='상품 가격'
          onChange={(e) => setPrice(e.target.value)} 
        />
        <button type='submit'>상품 추가</button>
      </form>

      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price} (X{item.quantity})
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => removeItem(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
