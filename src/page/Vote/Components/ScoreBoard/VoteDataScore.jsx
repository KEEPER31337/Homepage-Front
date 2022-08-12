import React, { useState, useEffect, useRef } from 'react';

// api
import voteAPI from 'API/v1/vote'; //getVoteResult

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무

const randomColor = () => {
  //r -> 250~255, g -> 225~245, b -> 130~200
  return `rgb( 
    ${Math.random() * (255 - 250) + 250},  
    ${Math.random() * (247 - 225) + 225},
    ${Math.random() * (160 - 130) + 130})`;
};

const getVoteData = ({ member, vote, job }) => {
  const [data, setData] = useState([]); // 보내줄 데이터
  const [name, setName] = useState('');
  const [count, setcount] = useState(0);
  const nextId = useRef(0);

  const [current, setCurrent] = useState([]);
  const [BossCandidate, setBoss] = useState([]);
  const [MiddleCandidate, setMiddle] = useState([]);
  const [MoneyCandidate, setMoney] = useState([]);
  useEffect(() => {
    voteAPI
      .getVoteResult({
        token: member.token,
        electionId: vote.voteId,
        jobId: BOSS,
      })
      .then((data) => {
        if (data.success) {
          setBoss(data.list);
        }
      });
    voteAPI
      .getVoteResult({
        token: member.token,
        electionId: vote.voteId,
        jobId: MIDDLEBOSS,
      })
      .then((data) => {
        if (data.success) {
          setMiddle(data.list);
        }
      });
    voteAPI
      .getVoteResult({
        token: member.token,
        electionId: vote.voteId,
        jobId: MONEYMEN,
      })
      .then((data) => {
        if (data.success) {
          setMoney(data.list);
        }
      });
  }, []);

  useEffect(() => {
    setData([]);
    setName('');
    setcount(0);
    nextId.current = 0;
    switch (job) {
      case BOSS:
        setCurrent(BossCandidate);
        break;
      case MIDDLEBOSS:
        setCurrent(MiddleCandidate);
        break;
      case MONEYMEN:
        setCurrent(MoneyCandidate);
        break;
      default:
        break;
    }
  }, [job, BossCandidate, MiddleCandidate, MoneyCandidate]);

  useEffect(() => {
    let counter = count;
    const interval = setInterval(() => {
      if (counter >= current.length) {
        clearInterval(interval);
        // 끝나는 구간
      } else {
        setName(current[counter].name);
        setcount((count) => count + 1);
        counter++;
      }
    }, 300); // 1초마다 name 재설정
    return () => clearInterval(interval);
  }, [current]);

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
