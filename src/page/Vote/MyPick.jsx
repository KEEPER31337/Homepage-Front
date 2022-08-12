import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import VoteSelect from './Components/MyPick/VoteSelect';
import VotingPaperBox from './Components/MyPick/VotingPaperBox';
import vote from 'assets/img/vote.png';
import Modal from 'react-awesome-modal';
import { useNavigate } from 'react-router-dom';
import voteAPI from 'API/v1/vote';
import VotingPaper from './Components/MyPick/VotingPaper';
import SockJsClient from 'react-stomp';

const BOSS = 1; // 회장
const MIDDLEBOSS = 2; // 부회장
const MONEYMEN = 7; // 총무
const url = process.env.REACT_APP_API_URL;

const MyPick = (props) => {
  const socketUrl = url + '/v1/websocket';

  const navigate = useNavigate();

  const [voteName, setVoteName] = useState('');
  const [isVote, setIsVote] = useState(false);
  const [alertMessage, setAlertMessage] = useState(<></>);

  const [myBoss, setMyBoss] = useState('');
  const [myMiddleBoss, setMyMiddleBoss] = useState('');
  const [myMoneyMan, setMyMoneyMan] = useState('');

  useEffect(() => {
    //선거 클릭하지 않았을때 에러처리
    if (props.vote.voteId === null) {
      setModalMessage('선거를 선택하지 않았습니다!');
      openModal();
    }

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
            setVoteMessage('참여 권한이 없습니다! ');
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
                  if (data.data) {
                    //투표했으면 vote 페이지로 이동.
                    setIsVote(true);
                    setVoteMessage('완료한 투표입니다!');
                  }
                }
              });
          }
        }
      });

    voteAPI
      .getVoteStatus({
        eid: props.vote.voteId,
        token: props.member.token,
      })
      .then((data) => {
        if (data.success) {
          setTotalVoter(data.data.total);
          setValidVoter(data.data.voted);
          setRate(data.data.rate);
        }
      });
  }, []);

  const Voting = () => {
    //투표 버튼 눌렀을때도, IsVote바뀌게!!
    console.log([myBoss, myMiddleBoss, myMoneyMan]);
    if (
      myBoss !== undefined &&
      myMiddleBoss !== undefined &&
      myMoneyMan !== undefined
    ) {
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
            setVoteMessage('완료한 투표입니다!');
            setIsVote(true);
          }
          console.log(data);
        });
    } else {
      console.log('xx');
      setAlertMessage(
        <div className="text-sm text-red-500 flex justify-center ">
          모든 후보자들을 선택해주세요
        </div>
      );
    }
  };

  // NOTE 실시간 웹소켓
  const [totalVoter, setTotalVoter] = useState(0);
  const [validVoter, setValidVoter] = useState(0);
  const [rate, setRate] = useState(0);

  const [list, setlist] = useState([]);
  const exampleList = [];

  const $websocket = useRef(null);

  // 애니메이션 관련
  useEffect(() => {
    var step;
    for (step = 0; step < validVoter; step++) {
      exampleList[step] = { id: step, isVote: true };
    }
    for (step; step < totalVoter; step++) {
      exampleList[step] = { id: step, isVote: false };
    }
    setlist(exampleList);
  }, [totalVoter, validVoter]);

  // NOTE  에러처리 관련
  const [modalStatus, setModalState] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [voteMessage, setVoteMessage] = useState('');

  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
    {
      props.vote.voteId === null
        ? navigate('/vote')
        : navigate('/vote/scoreboard');
    }
  };

  return (
    <div className="h-full w-full p-3 text-xl font-basic flex flex-col justify-center">
      <div className="h-fit w-full flex justify-center bg-slate-50 dark:bg-darkPoint items-center p-3">
        {/* 투표용지 */}
        <div className="h-full sm:w-5/12 w-full flex flex-col p-3 bg-white border border-slate-100  shadow-md">
          <div className="mt-2 mb-4 text-center font-semibold">{voteName}</div>

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
              {alertMessage}
              <div className="flex justify-between">
                <div></div>

                <button
                  onClick={Voting}
                  className="bg-slate-100 border-slate-300 rounded border-b-4 mt-2 px-4 py-1  hover:bg-slate-200"
                >
                  투표
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center w-full mb-4">
                {voteMessage}
                <img className="h-6 w-6 ml-2" src={vote}></img>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-slate-100 dark:bg-black w-11/12 flex flex-wrap justify-start p-2">
          {/* 실시간 애니메이션 */}
          {/* <VotingPaperBox /> */}
          {list.map((info) => (
            <VotingPaper key={info.id} isVote={info.isVote} />
          ))}
          <SockJsClient
            url={socketUrl}
            topics={['/topics/votes/result', '/topics/votes/end']}
            onMessage={(msg) => {
              //TODO 메시지 받아오기
              console.log('투표햇당');
              setTotalVoter(msg.total);
              setValidVoter(msg.voted);
              setRate(msg.rate);
              //실시간으로 투표가 종료되면 (관리자가 완료버튼 누르면)
              if (!msg.isOpen) {
                //값들이 다 0으로 초기화되기때문에, 보이는것만
                setModalMessage(
                  <>
                    <div>투표가 종료되었습니다!</div>
                    <div>집계결과페이지로 이동합니다</div>
                  </>
                );

                openModal();
              }
            }}
            ref={$websocket}
          />
        </div>

        <div className="w-1/12 p-2 bg-amber-300 dark:bg-black dark:text-slate-300 items-center flex flex-col justify-center">
          <div>투표율</div>
          <div className="text-2xl font-bold">{rate}%</div>
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
          <div className="h-full w-full flex flex-col justify-center items-center text-center">
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
