import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import voteAPI from 'API/v1/vote';
import { connect } from 'react-redux';

const CreateVote = ({ member }) => {
  //modal 관련
  const [modalStatus, setModalState] = useState(false);
  const openModal = (id) => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  //input 값 관련
  const [voteName, setVoteName] = useState('');
  const [voteDescription, setVoteDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  const voteNameHandler = (e) => {
    setVoteName(e.target.value);
  };
  const voteDescriptionHandler = (e) => {
    setVoteDescription(e.target.value);
  };
  const isAvailableHandler = (e) => {
    setIsAvailable(e.target.value);
  };

  const createVote1 = () => {
    console.log(member.token);
    //대회 추가하겠냐는 모달 후, 확인누르면, 실제로 api 동작하는 함수
    voteAPI
      .createVote({
        token: member.token,
        name: voteName,
        description: voteDescription,
        isAvailable: isAvailable,
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          // setCreate(!create);
        } else {
          console.log(data);
          alert('대회 생성 중 오류가 발생하였습니다.');
        }
      });

    setVoteName('');
    setVoteDescription('');
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
              value={voteName}
              onChange={voteNameHandler}
              placeholder="선거 이름을 적어주세요"
              className="w-2/3 h-8 mt-2 text-center dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-gray-300 focus:ring-gray-300 focus:ring-1 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
            />
            <textarea
              value={voteDescription}
              onChange={voteDescriptionHandler}
              placeholder="선거 설명을 적어주세요"
              className="w-2/3 h-full mt-2 text-center dark:bg-[#080b14] dark:border-opacity-0 border rounded-lg border-divisionGray focus:border-gray-300 focus:ring-gray-300 focus:ring-1 shadow-[inset_0_2px_0_1px_#f1f5f9] dark:shadow-[inset_0_2px_0_1px_#000000]"
            />
            {/* 공개, 비공개 radio 박스 */}
            <div
              onChange={isAvailableHandler}
              className="w-2/3 h-8 mt-2  text-center justify-end items-center flex flex-row"
            >
              <div className="flex items-center mx-2">
                <input
                  id="isAvailable-radio1"
                  type="radio"
                  value="open"
                  name="list-radio"
                  className="mr-1 w-4 h-4 text-slate-400 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label for="isAvailable-radio1">공개</label>
              </div>

              <div className="flex items-center mx-2">
                <input
                  id="isAvailable-radio2"
                  type="radio"
                  value="close"
                  name="list-radio"
                  className="mr-1 w-4 h-4 text-slate-400 bg-gray-100 border-gray-300 focus:ring-slate-500 dark:focus:ring-slate-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label for="isAvailable-radio2">비공개</label>
              </div>
            </div>
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
                createVote1();
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
