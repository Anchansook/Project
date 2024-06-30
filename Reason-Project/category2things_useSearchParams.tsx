import { useSearchParams } from 'react-router-dom';
//# 상품 두 가지로 해보기
// 상품에 대한 인터페이스 정의
interface Product {
  id: number;
  name: string;
  category: string;
};

// 예시 제품 데이터를 배열로 정의
// 생수 / 음료
const waters: Product[] = [
  {id: 1, name: '이오', category: '유산균 음료'},
  {id: 1, name: '삼다수', category: '생수'},
  {id: 1, name: '에비앙', category: '생수'},
  {id: 1, name: '연세우유', category: '유산균 음료'},
  {id: 1, name: '불가리스', category: '유산균 음료'}
];

// 라면
const noodles: Product[] = [
  {id: 1, name: '신라면', category: '국물 라면'},
  {id: 1, name: '불닭볶음면', category: '볶음 라면'},
  {id: 1, name: '짜파게티', category: '볶음 라면'},
  {id: 1, name: '열라면', category: '국물 라면'},
  {id: 1, name: '진라면', category: '국물 라면'}
];

export default function QueryParams02() {
  // 음료, 라면 쿼리 파라미터 상태 관리
  const [searchParams, setSearchParams] = useSearchParams();

  //* 각각 카테고리 쿼리 파라미터 값 읽어오기
  //& 각각 읽어오므로 가져오는 값의 이름도 각각의 이름으로 가져옴
  //& 기존 'category' -> 'waterFilter' && 'noodleFilter'
  const waterFilter = searchParams.get('waterFilter') || '';
  const noodleFilter = searchParams.get('noodleFilter') || '';

  //* 생수/음료 필터 변경 핸들러
  const handleWaterFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prevParams => ({
      ...Object.fromEntries(prevParams.entries()),
      waterFilter: e.target.value
    }))
  };

  //* 라면 필터 변경 핸들러
  const handleNoodleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prevParams => ({
      ...Object.fromEntries(prevParams.entries()),
      noodleFilter: e.target.value
    }))
  };
  //& 쿼리 파라미터 업데이트 함수 호출 -> 기존 쿼리 파라미터 가져오기 -> 쿼리 파라미터 쌍의 반복자 [key, value] = prevParams.entries()
  //& -> 객체로 반환 -> 드롭다운에서 선택한 값으로 필터 내용 변경

  // 카테고리 필터링 (필터링 된 게 없거나 있거나)
  const filteredWaters = waters.filter(water =>
    waterFilter === '' || water.category === waterFilter
  );

  const filteredNoodles = noodles.filter(noodle =>
    noodleFilter === '' || noodle.category === noodleFilter
  );

  return (
    <div>
      <h2>상품 목록</h2>

      <br />

      <div className='container' style={{display: 'flex'}}>
        <div className='water'>
          <h3>생수 / 음료</h3>
          <select value={waterFilter} onChange={handleWaterFilterChange}>
            <option value={''}>전체</option>
            <option value={'생수'}>생수</option>
            <option value={'유산균 음료'}>유산균 음료</option>
          </select>

          <ul>
            {filteredWaters.map(water => (
              <li key={water.id}>
                {water.name} - {water.category}
              </li>
            ))}
          </ul>
        </div>

        <div className='noodle'>
          <h3>라면</h3>
          <select value={noodleFilter} onChange={handleNoodleFilterChange}>
            <option value={''}>전체</option>
            <option value={'국물 라면'}>국물 라면</option>
            <option value={'볶음 라면'}>볶음 라면</option>
          </select>


          <ul>
            {filteredNoodles.map(noodle => (
              <li key={noodle.id}>
                {noodle.name} - {noodle.category}
              </li>
            ))}
          </ul>
        </div>

      </div>


    </div>
  )
}
