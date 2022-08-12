// 등록된 후보 목록을 현재 선택 페이지에 맡게 보내줌.
import React, { useEffect, useState } from 'react';

// api
import voteAPI from 'API/v1/vote';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무
const VOTER = 4; // 활동인원

const getContentData = ({ job, member, vote }) => {
  const [current, setCurrent] = useState([]);
  const [BossCandidate, setBoss] = useState([]);
  const [MiddleCandidate, setMiddle] = useState([]);
  const [MoneyCandidate, setMoney] = useState([]);
  const [Voters, setvoters] = useState([]);

  useEffect(() => {
    voteAPI
      .getCandidate({
        token: member.token,
        eid: vote.voteId,
        jid: BOSS,
      })
      .then((data) => {
        if (data.success) {
          setBoss(data.list);
        }
      });
    voteAPI
      .getCandidate({
        token: member.token,
        eid: vote.voteId,
        jid: MIDDLEBOSS,
      })
      .then((data) => {
        if (data.success) {
          setMiddle(data.list);
        }
      });
    voteAPI
      .getCandidate({
        token: member.token,
        eid: vote.voteId,
        jid: MONEYMEN,
      })
      .then((data) => {
        if (data.success) {
          setMoney(data.list);
        }
      });
    voteAPI
      .getVoters({
        token: member.token,
        eid: vote.voteId,
      })
      .then((data) => {
        if (data.success) {
          setvoters(data.list);
        }
      });
  }, []);

  useEffect(() => {
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
      case VOTER:
        setCurrent(Voters);
        break;
      default:
        break;
    }
  }, [BossCandidate, MiddleCandidate, MoneyCandidate, Voters, job]);

  return current;
};

export default getContentData;
