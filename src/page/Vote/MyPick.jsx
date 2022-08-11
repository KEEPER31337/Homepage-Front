import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import VoteSelect from './Components/MyPick/VoteSelect';
import VotingPaperBox from './Components/MyPick/VotingPaperBox';
import vote from 'assets/img/vote.png';
import Modal from 'react-awesome-modal';
import { useNavigate } from 'react-router-dom';
import voteAPI from 'API/v1/vote';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무

const MyPick = (props) => {
  const navigate = useNavigate();

  const [voteName, setVoteName] = useState('');
  const [isVote, setIsVote] = useState(false);

  const [myBoss, setMyBoss] = useState('');
  const [myMiddleBoss, setMyMiddleBoss] = useState('');
  const [myMoneyMan, setMyMoneyMan] = useState('');

  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    console.log('내 투표 : ', myBoss, myMiddleBoss, myMoneyMan);
  }, [myBoss, myMiddleBoss, myMoneyMan]);

  useEffect(() => {
    setVoteName(props.vote.voteName);

    //1차로, 참여 여부 api로, 내가 투표자에 등록되어있는지
    voteAPI
      .getJoinable({
        eid: props.vote.voteId,
        token: props.member.token,
      })
      .then((data) => {
        if (data.success) {
          if (!data.data) {
            //투표불가능하면 vote 페이지로 이동.
            setIsVote(true);
            setModalMessage('참여 권한이 없습니다! ');
            openModal();
          } else {
            //2차. 이미 투표했는지 안했는지.

            voteAPI
              .getVotable({
                eid: props.vote.voteId,
                vid: props.member.memberInfo.id,
                token: props.member.token,
              })
              .then((data) => {
                if (data.success) {
                  console.log(data);
                  if (data.data) {
                    //투표했으면 vote 페이지로 이동.
                    setIsVote(true);
                    setModalMessage('이미 투표했습니다 ');
                    openModal();
                  }
                }
              });
          }
        }
      });
  }, []);

  // 선거 안누르고 들어갔을때 뜨는 모달
  const [modalStatus, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
    navigate('/vote');
  };

  const Voting = () => {
    //투표 버튼 눌렀을때도, IsVote바뀌게!!
    console.log([myBoss, myMiddleBoss, myMoneyMan]);
    voteAPI
      .voting({
        eid: props.vote.voteId,
        vid: props.member.memberInfo.id,
        candidateIds: [myBoss, myMiddleBoss, myMoneyMan],
        token: props.member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log('투표완료!');
          setIsVote(true);
        }
        console.log(data);
      });
  };

  return (
    <div className="h-full w-full p-3 text-xl font-basic flex flex-col justify-center">
      <div className="h-fit w-full flex justify-center bg-slate-50 items-center p-3">
        {/* 투표용지 */}
        <div className="h-full sm:w-5/12 w-full flex flex-col p-3 bg-white border border-slate-100 shadow-md">
          <div className="mt-2 mb-4 text-center "> {voteName} </div>

          {/* 투표여부에 따라 */}
          {!isVote ? (
            <>
              <div className="flex flex-row w-full">
                <div className="w-2/6 items-center p-2">회장</div>
                <div className="w-4/6">
                  <VoteSelect MyPick={setMyBoss} job={BOSS} />
                </div>
              </div>
              <div className="flex flex-row w-full ">
                <div className="w-2/6 text-xl font-basic flex items-center p-2">
                  부회장
                </div>
                <div className="w-4/6">
                  <VoteSelect MyPick={setMyMiddleBoss} job={MIDDLEBOSS} />
                </div>
              </div>
              <div className="flex flex-row w-full ">
                <div className="w-2/6 text-xl font-basic flex items-center p-2">
                  총무
                </div>
                <div className="w-4/6">
                  <VoteSelect MyPick={setMyMoneyMan} job={MONEYMEN} />
                </div>
              </div>
              <div className="flex justify-between">
                <div></div>

                <button
                  onClick={Voting}
                  className="bg-slate-100 border-slate-300 rounded border-b-4 mt-4 px-4 py-1  hover:bg-slate-200"
                >
                  투표
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center w-full mb-4">
                이미 완료된 투표입니다!
                <img className="h-6 w-6 ml-2" src={vote}></img>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-slate-100 h-fit w-11/12 flex flex-wrap justify-start p-2">
          {/* 실시간 애니메이션 */}
          {/* <VotingPaperBox /> */}
        </div>
        <div className="w-1/12 bg-amber-300 items-center flex flex-col justify-center">
          <div>투표율</div>
          <div className="text-2xl font-bold">{}</div>
        </div>
      </div>
      {/* 모달창 */}
      <Modal // [1차] 선거를 먼저 눌러달라는 모달 + [2차] 참여 못한다는 모달
        visible={modalStatus}
        width="300"
        height="140"
        onClickAway={() => closeModal(false)}
      >
        <div className=" p-3 w-full h-full flex flex-col  items-center text-center text-base">
          <div className="h-full w-full flex justify-center items-center text-center">
            {modalMessage}
          </div>
          <div className="flex ">
            <button
              className="bg-white   mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPick);
