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
  const [value, setValue] = useState(0);

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
          data.list.map((member, idx) => {
            checkedBoss.add(member.memberId);
            setCheckedBoss(checkedBoss);
          });
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
          data.list.map((member, idx) => {
            checkedMiddle.add(member.memberId);
            setCheckedMiddle(checkedMiddle);
          });
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
          data.list.map((member, idx) => {
            checkedMoney.add(member.memberId);
            setCheckedMoney(checkedMoney);
          });
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
          data.list.map((member, idx) => {
            checkedUser.add(member.memberId);
            setCheckedUser(checkedUser);
          });
        }
      });
  }, []);
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
  }, [value]);

  const checkedItemHandler = (members, isChecked) => {
    switch (job) {
      case BOSS:
        if (isChecked) {
          checkedBoss.add(members.memberId);
          setCheckedBoss(checkedBoss);
          voteAPI
            .addCandidate({
              token: member.token,
              memberId: members.memberId,
              electionId: vote.voteId,
              memberJobId: BOSS,
            })
            .then(() => {
              setValue((dd) => dd + 1);
            });
        } else if (!isChecked && checkedBoss.has(members.memberId)) {
          checkedBoss.delete(members.memberId);
          setCheckedBoss(checkedBoss);
          BossCandidate.map((mem) => {
            if (mem.memberId == members.memberId) {
              voteAPI.deleteCandidate({
                token: member.token,
                id: mem.candidateId,
              });
            }
          });
        }
        break;
      case MIDDLEBOSS:
        if (isChecked) {
          checkedMiddle.add(members.memberId);
          setCheckedMiddle(checkedMiddle);
          voteAPI
            .addCandidate({
              token: member.token,
              memberId: members.memberId,
              electionId: vote.voteId,
              memberJobId: MIDDLEBOSS,
            })
            .then(() => {
              setValue((dd) => dd + 1);
            });
        } else if (!isChecked && checkedMiddle.has(members.memberId)) {
          checkedMiddle.delete(members.memberId);
          setCheckedMiddle(checkedMiddle);
          MiddleCandidate.map((mem) => {
            if (mem.memberId == members.memberId) {
              voteAPI.deleteCandidate({
                token: member.token,
                id: mem.candidateId,
              });
            }
          });
        }
        break;
      case MONEYMEN:
        if (isChecked) {
          checkedMoney.add(members.memberId);
          setCheckedMoney(checkedMoney);
          voteAPI
            .addCandidate({
              token: member.token,
              memberId: members.memberId,
              electionId: vote.voteId,
              memberJobId: MONEYMEN,
            })
            .then(() => {
              setValue((dd) => dd + 1);
            });
        } else if (!isChecked && checkedMoney.has(members.memberId)) {
          checkedMoney.delete(members.memberId);
          setCheckedMoney(checkedMoney);
          MoneyCandidate.map((mem) => {
            if (mem.memberId == members.memberId) {
              voteAPI.deleteCandidate({
                token: member.token,
                id: mem.candidateId,
              });
            }
          });
        }
        break;
      case VOTER:
        if (isChecked) {
          checkedUser.add(members.memberId);
          setCheckedUser(checkedUser);
          voteAPI
            .addVoters({
              token: member.token,
              vid: members.memberId,
              eid: vote.voteId,
            })
            .then(() => {
              setValue((dd) => dd + 1);
            });
        } else if (!isChecked && checkedUser.has(members.memberId)) {
          checkedUser.delete(members.memberId);
          setCheckedUser(checkedUser);
          voteAPI.deleteVoters({
            token: member.token,
            eid: vote.voteId,
            vid: members.memberId,
          });
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
