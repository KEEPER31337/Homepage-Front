import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';

const ContestOpenCloseBtn = ({ member, isJoinable, ctfId }) => {
  // 탈퇴 눌렀을때 뜨는 모달
  useEffect(() => {}, []);
  //새로 api(list)받지않고, 버튼 색깔 바꾸기 위해
  const [state, setState] = useState(isJoinable);

  const [modalStatus, setModalState] = useState(false);
  const openModal = (id) => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const closeContest = () => {
    ctfAPI
      .closeContest({
        cid: ctfId,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          // console.log(data);
          setState(false);
        } else {
          // console.log(data);
          alert('대회 닫기 중 오류가 발생하였습니다.');
        }
      });
  };

  useEffect(() => {
    setState(isJoinable);
  }, [isJoinable]);

  const openContest = () => {
    ctfAPI
      .openContest({
        cid: ctfId,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          // console.log(data);
          setState(true);
        } else {
          // console.log(data);
          alert('대회 열기 중 오류가 발생하였습니다.');
        }
      });
  };

  return (
    <div className="w-2/3">
      {state === true ? (
        <div className="flex rounded bg-green-300 border-2 border-green-400 shadow-[inset_0_2px_0_1px_#ffffff]">
          <button
            onClick={openModal}
            className="hover:bg-green-400  w-full hover:text-mainWhite rounded"
          >
            열림
          </button>
        </div>
      ) : (
        <div className="flex rounded bg-amber-300 border-2 border-amber-400 shadow-[inset_0_2px_0_1px_#ffffff]">
          <button
            onClick={openModal}
            className="hover:bg-amber-400  w-full hover:text-mainWhite rounded"
          >
            닫힘
          </button>
        </div>
      )}
      <Modal
        visible={modalStatus}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          {state === true ? '닫힘' : '열림'}으로 전환하시겠습니까?
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
                  state === true ? closeContest() : openContest();
                }
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
  return { member: state.member };
};

export default connect(mapStateToProps)(ContestOpenCloseBtn);
