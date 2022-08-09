import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import VoteSelect from './Components/VoteSelect';
import VotingPaperBox from './Components/MyPick/VotingPaperBox';
import vote from 'assets/img/vote.png';
const MyPick = (props) => {
  //TODO
  //투표여부 확인 api -> 했으면 -> 진행여부(실시간) 애니메이션만
  // 안했으면 ->
  const [voteName, setVoteName] = useState('');
  const [isVote, setIsVote] = useState(false);

  useEffect(() => {
    console.log('my pick 페이지 redux');
    console.log(props.vote.voteId);
    console.log(props.vote.voteName);

    setVoteName(props.vote.voteName);

    //TODO 투표 여부 API ->
    setIsVote(false);
  }, []);

  const Voting = () => {
    //투표 버튼 눌렀을때도, IsVote바뀌게!!
    console.log('투표완료!');
    setIsVote(true);
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
                  <VoteSelect />
                </div>
              </div>
              <div className="flex flex-row w-full ">
                <div className="w-2/6 text-xl font-basic flex items-center p-2">
                  부회장
                </div>
                <div className="w-4/6">
                  <VoteSelect />
                </div>
              </div>
              <div className="flex flex-row w-full ">
                <div className="w-2/6 text-xl font-basic flex items-center p-2">
                  총무
                </div>
                <div className="w-4/6">
                  <VoteSelect />
                </div>
              </div>
              <div className="flex justify-between">
                <div></div>

                <button
                  onClick={Voting}
                  class="bg-slate-100 border-slate-300 rounded border-b-4 mt-4 px-4 py-1  hover:bg-slate-200"
                >
                  투표
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center w-full mb-4">
                이미 완료한 투표입니다!
                <img className="h-6 w-6 ml-2" src={vote}></img>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row">
        {' '}
        <div className="bg-slate-100 h-fit w-11/12 flex flex-wrap justify-start p-2">
          {/* 실시간 애니메이션 */}
          <VotingPaperBox />
        </div>
        <div className="w-1/12 bg-amber-300 items-center flex flex-col justify-center">
          <div>투표율</div>
          <div className="text-2xl font-bold">55%</div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPick);
