import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
// redux
import actionMember from 'redux/action/member';
//local
import Header from '../Components/Submissions/SubmitHeader';
import Content from '../Components/Submissions/SubmitContent';
import getContentData from '../Components/Submissions/GetContentData';
import AuthModal from '../Components/AuthModal';

const Submissions = ({ member, vote }) => {
  // 권한 없는 자가 접근했을 경우, vote페이지로 이동
  const [auth, setAuth] = useState(['ROLE_회장']);
  const jobs = member?.memberInfo?.jobs;
  const ModalRef = useRef({});

  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
    if (vote.voteId === null) {
      setModalMessage('선거를 선택하지 않았습니다!');
      openModal();
    }
  }, []);

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

  // 현재 어느 목록의 후보자를 보여줄 것인지
  const [job, setJob] = useState(1); // 1 == 회장
  const current = getContentData({ member, vote, job });

  return (
    <div className="flex flex-1 justify-center font-basic">
      <div className="flex flex-col w-fit mt-5">
        <Header job={job} setJob={setJob} />
        <Content memberList={current} />
      </div>
      <AuthModal ref={ModalRef}>선거 관리자만 접근할 수 있습니다</AuthModal>

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

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);
