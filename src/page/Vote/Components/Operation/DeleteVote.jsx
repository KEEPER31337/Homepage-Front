import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';
import { TrashIcon } from '@heroicons/react/outline';

const DeleteVote = ({ challengeId }) => {
  // 삭제 눌렀을때 뜨는 모달
  const [modalStatus, setModalState] = useState(false);
  const openModal = (id) => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  const deleteVote = () => {
    //TODO 삭제 api
  };

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-md h-7 w-7 bg-slate-300 hover:bg-slate-400 border-slate-300"
      >
        <TrashIcon className="inline-block h-5 w-5 text-slate-600" />
      </button>
      <Modal // 팀 정보 수정 클릭 시 뜨는 창
        visible={modalStatus}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className=" p-3 w-full h-full flex flex-col  items-center text-center text-base">
          <div className="h-full w-full flex justify-center items-center text-center">
            삭제하시겠습니까?
          </div>
          <div className="flex ">
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
                DeleteVote();
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

export default connect(mapStateToProps)(DeleteVote);
