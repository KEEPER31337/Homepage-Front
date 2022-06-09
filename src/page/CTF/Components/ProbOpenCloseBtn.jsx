import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';

const ProbOpenCloseBtn = ({ member, isSolvable, challengeId }) => {
  // 탈퇴 눌렀을때 뜨는 모달
  useEffect(() => {}, []);
  //새로 api(list)받지않고, 버튼 색깔 바꾸기 위해
  const [state, setState] = useState(isSolvable);

  const [modalStatus, setModalState] = useState(false);
  const openModal = (id) => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const closeProb = () => {
    ctfAPI
      .closeProb({
        pid: challengeId,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setState(false);
        }
      });
  };
  const openProb = () => {
    ctfAPI
      .openProb({
        pid: challengeId,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setState(true);
        }
      });
  };
  return (
    <>
      {state === true ? (
        <div className="flex rounded bg-green-300 border-2 border-green-400 shadow-[inset_0_2px_0_1px_#ffffff]">
          <button
            onClick={openModal}
            className="hover:bg-green-400  w-full hover:text-mainWhite rounded"
          >
            공개
          </button>
        </div>
      ) : (
        <div className="flex rounded bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
          <button
            onClick={openModal}
            className="hover:bg-amber-400  w-full hover:text-mainWhite rounded"
          >
            비공개
          </button>
        </div>
      )}
      <Modal // 팀 정보 수정 클릭 시 뜨는 창
        visible={modalStatus}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          {state === true ? '비공개' : '공개'}로 전환하시겠습니까?
          <div className="flex m-8">
            <button
              className="bg-white mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal();
              }}
            >
              취소
            </button>
            <button
              className="bg-white   mx-1 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                closeModal();

                {
                  state === true ? closeProb() : openProb();
                }
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ProbOpenCloseBtn);
