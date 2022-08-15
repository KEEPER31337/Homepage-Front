import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';
import vote from 'assets/img/vote.png';
import VotingPaper from './VotingPaper';

import SockJsClient from 'react-stomp';

const VotingPaperBox = ({ member }) => {
  //MEMO 컴포넌트 VotingPaperBox안, 여러 종이들을 VotingPaper.

  // 이제, 받은 인원 , 투표한 인원 받아가지고
  //{1,true}*32 + for문으로.. 만들면 될듯??ㄴ

  //1. 투표할때마다 2. 활동인원추가될때 (다른페이지)
  const [totalVoter, setTotalVoter] = useState(0);
  const [validVoter, setValidVoter] = useState(0);

  const [list, setlist] = useState([]);
  const exampleList = [];

  const $websocket = useRef(null);

  const handleMsg = (msg) => {
    console.log(msg);
  };

  const handleClickSendTo = () => {
    //서버에 메시지 보냄
    $websocket.current.sendMessage('/vote1');
  };

  const handleClickSendTemplate = () => {
    $websocket.current.sendMessage('/vote2');
  };

  useEffect(() => {
    var step;
    for (step = 0; step < validVoter; step++) {
      exampleList[step] = { id: step, isVote: true };
    }
    for (step; step < totalVoter; step++) {
      exampleList[step] = { id: step, isVote: false };
    }
    setlist(exampleList);
    console.log('dd');
  }, [totalVoter, validVoter]);

  // useEffect(() => {
  //   $websocket.current.sendMessage('/vote2');

  //   console.log('처음dd');
  // }, []);

  return (
    <>
      {list.map((info) => (
        <VotingPaper key={info.id} isVote={info.isVote} />
      ))}

      <SockJsClient
        url="http://localhost:8080/v1/vote"
        topics={['/topics/vote1', '/topics/vote2', '/topics/vote3']}
        onMessage={(msg) => {
          console.log(msg);
          setTotalVoter(msg.total);
          setValidVoter(msg.voted);
        }}
        onConnect={() => {
          console.log('처음');
          handleClickSendTemplate();
        }}
        ref={$websocket}
      />
      <div className="flex flex-col">
        {' '}
        <button onClick={handleClickSendTo}>SendTo</button>
        <button onClick={handleClickSendTemplate}>SendTemplate</button>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VotingPaperBox);
