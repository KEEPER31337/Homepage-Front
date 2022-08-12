import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import { useNavigate } from 'react-router-dom';
import SockJsClient from 'react-stomp';
// redux
import actionMember from 'redux/action/member';
// local
import ChartBar from './Components/ScoreBoard/GetChartBar';
import noticeImg from 'assets/img/ctfImg/notice.png';
import Header from './Components/ScoreBoard/ScoreHeader';
// api
import voteAPI from 'API/v1/vote';
const url = process.env.REACT_APP_API_URL;

const ScoreBoard = ({ member, vote }) => {
  const navigate = useNavigate();
  //웹소켓
  const $websocket = useRef(null);
  const socketUrl = url + '/v1/websocket';

  // 투표 집계 가능한지 판단 기준!!
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (vote.voteId === null) {
      setModalMessage('선거를 선택하지 않았습니다!');
      openModal();
    }
    voteAPI.getVoteList({ token: member.token }).then((data) => {
      if (data.success) {
        data.page.content.map((ct) => {
          if (ct.electionId === vote.voteId) {
            setVisible(!ct.isAvailable);
            // 종료 된지 그 여부를 알고 싶기 때문에 not!
          }
        });
      }
    });
  }, []);

  // 지금 어느 직책 개표 중인지 판단
  const [job, setJob] = useState(1); // 1 == BOSS

  // 여러가지 에러를 띄워주는 모달 창 관리
  const [modalStatus, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
    navigate('/vote');
  };
  // 모달창 안에 들어갈 문구!
  const [modalMessage, setModalMessage] = useState('');

  return (
    <div className="flex flex-col items-center w-full font-basic">
      <Header job={job} setJob={setJob} />
      {visible ? (
        <ChartBar member={member} vote={vote} job={job} />
      ) : (
        <div className="pt-5 grid place-items-center">
          <img className="h-24 w-24" src={noticeImg} />
          <div className="flex whitespace-pre text-center dark:text-slate-200 text-4xl m-2 font-bold">
            아직 투표가 <div className="text-mainYellow">진행중</div>입니다!
          </div>
        </div>
      )}
      <SockJsClient
        url={socketUrl}
        topics={['/topics/votes/end']}
        onMessage={(msg) => {
          //실시간으로 투표가 종료되면 (관리자가 완료버튼 누르면)
          if (!msg.isOpen) {
            setVisible(true);
          }
        }}
        ref={$websocket}
      />
      <Modal
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);
