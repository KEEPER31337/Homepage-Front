import { useState, useEffect, useRef } from 'react';

const tmp = [
  '이다은',
  '김은지',
  '장서윤',
  '민예진',
  '이다은',
  '김은지',
  '장서윤',
  '민예진',
  '김은지',
  '장서윤',
  '임연후',
  '11',
  '2',
  '3',
  '4',
  '임연후',
  '민예진',
  '김은지',
  '김은지',
  '김은지',
  '김은지',
];
const randomColor = () => {
  //r -> 250~255, g -> 225~245, b -> 130~200
  return `rgb( 
    ${Math.random() * (255 - 250) + 250},  
    ${Math.random() * (245 - 225) + 225},
    ${Math.random() * (200 - 130) + 130})`;
};

const getVoteData = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [count, setcount] = useState(0);
  const nextId = useRef(0);

  useEffect(() => {
    let counter = count;
    const interval = setInterval(() => {
      if (counter >= tmp.length) {
        clearInterval(interval);
        // 끝나는 구간
      } else {
        setName(tmp[counter]);
        setcount((count) => count + 1);
        counter++;
      }
    }, 200); // 1초마다 name 재설정
    return () => clearInterval(interval);
  }, [tmp]);

  useEffect(() => {
    const us = {
      id: nextId.current,
      title: name,
      value: 1,
      color: randomColor(),
    };
    const abc = data.map((u) =>
      u.title === name ? { ...u, value: u.value + 1 } : u
    ); // 이름이 같은게 있으면 value를 증가시킴
    if (name === '') {
      // 이름이 비어있을때 들어오는 것 무시
    } else if (JSON.stringify(data) === JSON.stringify(abc)) {
      setData([...data, us]);
      nextId.current += 1;
      // value 값의 변화가 없음 == 새로운 이름임!
      // => 새로운 셋 추가
    } else {
      setData(abc);
      // value 값의 변화가 있음
      // => 바뀐 셋으로 설정
    }
  }, [count]); // name이 변할때 마다 다시 하기

  return data;
};

export default getVoteData;
