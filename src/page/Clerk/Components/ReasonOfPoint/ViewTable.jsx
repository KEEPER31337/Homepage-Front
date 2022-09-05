import React, { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { connect } from 'react-redux';

import clerkAPI from 'API/v1/clerk';
import ReasonModal from './ReasonModal';

const ViewTable = ({ curYear, recordData, setRecordData, state }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const token = state.member.token;

  //탭 크기가 변할때마다 페이지를 재렌더링하기위한 state
  const smWidth = resolveConfig().theme.screens.sm;
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    clerkAPI.getPointOfYear({ token, year: curYear }).then((res) => {
      //console.log(res);
      if (res?.success) setRecordData(res.list);
    });
  }, [curYear]);

  return (
    <div className="bg-mainWhite rounded-md p-2">
      {isOpen ? (
        <ReasonModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalData={modalData}
        />
      ) : (
        ''
      )}
      <table className="w-full text-center">
        <tr className="flex border-b-2 w-full">
          <th className="min-w-[2em] w-[2em] px-1">No</th>
          <div className="flex w-full">
            <th className="min-w-[7em] w-[7em] px-1">날짜</th>
            <th className="min-w-[4em] w-full px-1">이름</th>
            {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
            <th className="hidden sm:block sm:w-full px-1">사유</th>
            <th className="min-w-[3em] sm:w-[6em] px-1">상점</th>
            <th className="min-w-[3em] sm:w-[6em] px-1">벌점</th>
          </div>
        </tr>
        {recordData?.length !== 0 ? (
          recordData.map((data, index) => (
            <button
              key={index}
              className="flex border-b w-full"
              onClick={() => {
                setModalData({ ...data, no: index + 1 });
                setIsOpen(true);
              }}
              disabled={window.innerWidth > parseInt(smWidth, 10)}
            >
              <td className="min-w-[2em] w-[2em] p-1">{index + 1}</td>
              <div className="flex w-full">
                <td className="min-w-[7em] w-[7em] p-1">{data.date}</td>
                <td className="min-w-[4em] w-full p-1">
                  {data.awarderRealName}
                </td>
                {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
                <td className="hidden sm:block sm:w-full p-1 text-left">
                  {data.detail}
                </td>
                <td className="min-w-[3em] sm:w-[6em] p-1 border-x">
                  {data.isMerit ? data.merit : ''}
                </td>
                <td className="min-w-[3em] sm:w-[6em] p-1">
                  {!data.isMerit ? data.merit : ''}
                </td>
              </div>
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center h-20 text-slate-300 ">
            상벌점 내역이 존재하지 않습니다
          </div>
        )}
      </table>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(ViewTable);
