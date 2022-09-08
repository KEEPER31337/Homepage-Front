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
          No.{modalData.no}
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
          className="h-full bg-mainWhite rounded-b-lg pb-4 flex flex-col justify-center dark:bg-darkPoint"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-[5em] font-bold">기록 일자</span>
                {modalData.date}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[5em] font-bold">이름</span>
                {modalData.awarderRealName}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[5em] font-bold">상/벌점</span>
                {modalData.isMerit ? (
                  <>
                    <span className="text-green-400">상점</span>
                    {modalData.merit}점
                  </>
                ) : (
                  <>
                    <span className="text-red-400">벌점</span>
                    {modalData.merit}점
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="w-[5em] font-bold">상벌점 사유</span>
                <span
                  className={
                    (modalData.isMerit ? 'text-green-500' : 'text-red-500') +
                    ' font-bold max-w-[15em]'
                  }
                >
                  {modalData.detail}
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
