import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// redux
import actionMember from 'redux/action/member';

//local
import Header from './ReviseHeader';
import ContentMD from './SubmitContentMD';
import ContentLG from './SubmitContentLG';
import ContentSM from './SubmitContentSM';

// API
import memberAPI from 'API/v1/member';
import voteAPI from 'API/v1/vote';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무
const VOTER = 4; // 활동인원

const RevisePeople = ({ member, vote }) => {
  // 전체 회원 띄우기 위한 셋팅
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    memberAPI.getMembers({ token: member.token }).then((data) => {
      if (data.success) {
        setMemberList(data.list);
        console.log(data.list);
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
          console.log(data.list);
          // TODO
          // 이미 등록된 후보자의 경우 다르게 표시 하기 위해
          // checkedBox들에 넣어주기!!
          // 근데 memberId로 구분하려 했는데.. 그걸 안받아 왔넹.. 하핳...
          // 우창님 죄송...
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
      .getCandidate({
        token: member.token,
        eid: vote.voteId,
        jid: VOTER,
      })
      .then((data) => {
        if (data.success) {
          setvoters(data.list);
        }
      });
  }, []);

  const checkedItemHandler = (memberId, isChecked) => {
    switch (job) {
      case BOSS:
        if (isChecked) {
          checkedBoss.add(memberId);
          setCheckedBoss(checkedBoss);
          voteAPI
            .addCandidate({
              token: member.token,
              memberId: memberId,
              electionId: vote.voteId,
              memberJobId: BOSS,
            })
            .then((data) => {
              console.log(data);
              // TODO
              // 실패 했을 때 에러 처리하기
              // voteID가 없을때
              // navigate로 선거 선택하게 하기.
            });
        } else if (!isChecked && checkedBoss.has(memberId)) {
          checkedBoss.delete(memberId);
          setCheckedBoss(checkedBoss);
          // TODO deleteCandidate API 추가
          // id : candidateId 넘겨받기 위해 코드 수정하기.
          // candidateId 는 후보자 목록 api 수정되면 넣을 수 있을듯...
          // 내가 할게.. 하하
        }
        break;
      case MIDDLEBOSS:
        if (isChecked) {
          checkedMiddle.add(memberId);
          setCheckedMiddle(checkedMiddle);
          voteAPI
            .addCandidate({
              token: member.token,
              memberId: memberId,
              electionId: vote.voteId,
              memberJobId: MIDDLEBOSS,
            })
            .then((data) => {
              console.log(data);
              // TODO
              // 실패 했을 때 에러 처리하기
              // voteID가 없을때
              // navigate로 선거 선택하게 하기.
            });
        } else if (!isChecked && checkedMiddle.has(memberId)) {
          checkedMiddle.delete(memberId);
          setCheckedMiddle(checkedMiddle);
          // TODO 보스와 마찬가지로 후보자 삭제 api 넣기
        }
        break;
      case MONEYMEN:
        if (isChecked) {
          checkedMoney.add(memberId);
          setCheckedMoney(checkedMoney);
          voteAPI
            .addCandidate({
              token: member.token,
              memberId: memberId,
              electionId: vote.voteId,
              memberJobId: MONEYMEN,
            })
            .then((data) => {
              console.log(data);
              // TODO
              // 실패 했을 때 에러 처리하기
              // voteID가 없을때
              // navigate로 선거 선택하게 하기.
            });
        } else if (!isChecked && checkedMoney.has(memberId)) {
          checkedMoney.delete(memberId);
          setCheckedMoney(checkedMoney);
          // TODO 보스와 마찬가지로 후보자 삭제 api 넣기
        }
        break;
      case VOTER:
        if (isChecked) {
          checkedUser.add(memberId);
          setCheckedUser(checkedUser);
          voteAPI
            .addVoters({
              token: member.token,
              vid: memberId,
              eid: vote.voteId,
            })
            .then((data) => {
              console.log(data);
              // TODO
              // 실패 했을 때 에러 처리하기
              // voteID가 없을때
              // navigate로 선거 선택하게 하기.
            });
        } else if (!isChecked && checkedUser.has(memberId)) {
          checkedUser.delete(memberId);
          setCheckedUser(checkedUser);
          // TODO 보스와 마찬가지로 후보자 삭제 api 넣기
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
      case VOTER:
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
  return { member: state.member, vote: state.vote };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RevisePeople);