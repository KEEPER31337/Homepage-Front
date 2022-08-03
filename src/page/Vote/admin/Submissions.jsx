import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Marquee from 'react-fast-marquee';

// redux
import actionMember from 'redux/action/member';

//local
import Header from '../Components/SubmitHeader';
import ContentMD from '../Components/SubmitContentMD';
import ContentLG from '../Components/SubmitContentLG';
import ContentSM from '../Components/SubmitContentSM';

// API
import memberAPI from 'API/v1/member';

const BOSS = 0; // 회장
const MIDDLEBOSS = 1; // 부회장
const MONEYMEN = 2; // 총무
const USER = 3; // 활동인원

const Operation = ({ member }) => {
  // 전체 회원 띄우기 위한 셋팅
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    memberAPI.getMembers({ token: member.token }).then((data) => {
      if (data.success) {
        setMemberList(data.list);
      }
    });
  }, [member]);

  // 현재 어느 목록의 후보자를 뽑을 것인지
  const [job, setJob] = useState(BOSS);

  // 후보자 체크된 목록을 담고 있는 변수
  const [current, setCurrent] = useState(new Set());
  const [checkedBoss, setCheckedBoss] = useState(new Set());
  const [checkedMiddle, setCheckedMiddle] = useState(new Set());
  const [checkedMoney, setCheckedMoney] = useState(new Set());
  const [checkedUser, setCheckedUser] = useState(new Set());
  const checkedItemHandler = (memberId, isChecked) => {
    switch (job) {
      case BOSS:
        if (isChecked) {
          checkedBoss.add(memberId);
          setCheckedBoss(checkedBoss);
        } else if (!isChecked && checkedBoss.has(memberId)) {
          checkedBoss.delete(memberId);
          setCheckedBoss(checkedBoss);
        }
        break;
      case MIDDLEBOSS:
        if (isChecked) {
          checkedMiddle.add(memberId);
          setCheckedMiddle(checkedMiddle);
        } else if (!isChecked && checkedMiddle.has(memberId)) {
          checkedMiddle.delete(memberId);
          setCheckedMiddle(checkedMiddle);
        }
        break;
      case MONEYMEN:
        if (isChecked) {
          checkedMoney.add(memberId);
          setCheckedMoney(checkedMoney);
        } else if (!isChecked && checkedMoney.has(memberId)) {
          checkedMoney.delete(memberId);
          setCheckedMoney(checkedMoney);
        }
        break;
      case USER:
        if (isChecked) {
          checkedUser.add(memberId);
          setCheckedUser(checkedUser);
        } else if (!isChecked && checkedUser.has(memberId)) {
          checkedUser.delete(memberId);
          setCheckedUser(checkedUser);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (job) {
      case BOSS:
        setCurrent(checkedBoss);
        break;
      case MIDDLEBOSS:
        setCurrent(checkedMiddle);
        break;
      case MONEYMEN:
        setCurrent(checkedMoney);
        break;
      case USER:
        setCurrent(checkedUser);
        break;
      default:
        break;
    }
  }, [checkedBoss, checkedMoney, checkedMiddle, checkedUser, job]);

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col w-fit mt-5">
        <Header job={job} setJob={setJob} />
        <ContentSM
          memberList={memberList}
          checkedItemHandler={checkedItemHandler}
          currentItem={current}
        />
        <ContentMD
          memberList={memberList}
          checkedItemHandler={checkedItemHandler}
          currentItem={current}
        />
        <ContentLG
          memberList={memberList}
          checkedItemHandler={checkedItemHandler}
          currentItem={current}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Operation);
