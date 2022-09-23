//모바일에서만 보일 상벌점 내역 사유
import React, { useRef } from 'react';

//local

const ReasonModal = ({ isOpen, setIsOpen, modalData }) => {
  const outside = useRef();
  const handleModalClose = (e) => {
    //모달창 바깥 배경 클릭 시 모달이 닫히도록
    if (isOpen && outside.current === e.target) setIsOpen(false);
  };
  return (
    <div
      className="font-basic h-w-full flex justify-center fixed top-0 left-0 right-0 bottom-0 z-[99] bg-mainBlack bg-opacity-60"
      ref={outside}
      onClick={(e) => handleModalClose(e)}
    >
      <div className="flex flex-col w-[80vw] h-[30vh] p-2 my-auto text-sm sm:text-base">
        <div className="h-[2em] rounded-t-lg relative p-1 px-2 bg-mainWhite font-bold dark:bg-darkPoint dark:text-gray-200">
          {modalData.realName}
          <span className="text-gray-400 text-xs px-2">11기</span>
          <button
            className="text-2xl absolute -top-[3px] right-1 w-5 font-bold text-center text-gray-400 "
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &times;
          </button>
        </div>
        <form
          className="h-full bg-mainWhite rounded-b-lg flex flex-col justify-center dark:bg-darkPoint"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col gap-2 h-full p-2">
              <div className="shrink flex flex-col shrink items-center text-center">
                <span className="w-[5em] font-bold">상/벌점</span>
                <div className="flex gap-2 font-bold">
                  <span className="text-green-400">상점</span>
                  {modalData.totalMerit}점
                  <span className="text-red-400">벌점</span>
                  {modalData.totalDemerit}점
                </div>
              </div>

              <div className="grow flex flex-col items-center py-4">
                <span className="w-[5em] font-bold">상벌점 사유</span>
                <span
                  className={
                    ' text-gray-400 border w-full h-full rounded-md p-2 flex items-center justify-center font-bold'
                  }
                >
                  {Object.keys(modalData.detailsWithCount)
                    .map(
                      (key) =>
                        key + ' ' + modalData.detailsWithCount[key] + '회'
                    )
                    .join(', ')}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReasonModal;
