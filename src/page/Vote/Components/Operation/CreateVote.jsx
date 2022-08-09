import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import ctfAPI from 'API/v1/ctf';
import { connect } from 'react-redux';

const CreateVote = ({}) => {
  const [modalStatus, setModalState] = useState(false);
  const openModal = (id) => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      {/* 추가버튼 */}
      <button
        onClick={openModal}
        className="w-28 h-10 font-extrabold bg-slate-100 border-slate-300 rounded border-b-4 px-4 py-1 hover:bg-slate-200 mx-2"
      >
        <div>추가</div>
      </button>
      {/* 모달창 */}
      <Modal // 팀 정보 수정 클릭 시 뜨는 창
        visible={modalStatus}
        width="500"
        height="300"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className=" p-3 w-full h-full flex flex-col  items-center text-center text-base">
          <div className="h-full w-full flex flex-col items-center">
            <input
              type="text"
              // value={description}
              name="description"
              // onChange={descriptionHandler}

              placeholder="선거 이름을 적어주세요"
              className="w-2/3 h-8 mt-2 text-center dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-gray-300 focus:ring-gray-300 focus:ring-1 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
            />
            <textarea
              // value={description}
              name="description"
              // onChange={descriptionHandler}

              placeholder="선거 설명을 적어주세요"
              className="w-2/3 h-full mt-2 text-center dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-gray-300 focus:ring-gray-300 focus:ring-1 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
            />
          </div>
          <div className="w-full mt-2">
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
                //    create
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

export default connect(mapStateToProps)(CreateVote);
