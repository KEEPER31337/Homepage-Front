import React, { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

import ReasonModal from '../Point/ReasonModal';
import { compareName, compareRanking } from '../ReasonOfPoint/PointUtil';

const testData = [
  {
    date: '2022-08-16',
    name: '김김김',
    reason: '무단결석',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-16',
    name: '이이이',
    reason: '회비 미납부',
    plusP: 0,
    minusP: 1,
  },
  {
    date: '2022-08-16',
    name: '아무개',
    reason: '각종 대외발표',
    plusP: 2,
    minusP: 0,
  },
  {
    date: '2022-08-22',
    name: '정정정',
    reason: '무단결석',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-22',
    name: '마라탕',
    reason: '지각 2회',
    plusP: 0,
    minusP: 10,
  },
  {
    date: '2022-08-22',
    name: '짜장면',
    reason: '그냥',
    plusP: 1,
    minusP: 0,
  },
  {
    date: '2022-08-16',
    name: '백숙',
    reason: '무단결석',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-16',
    name: '시금치',
    reason: '회비 미납부',
    plusP: 0,
    minusP: 1,
  },
  {
    date: '2022-08-16',
    name: '정어리',
    reason: '각종 대외발표',
    plusP: 2,
    minusP: 0,
  },
  {
    date: '2022-08-22',
    name: '흑미밥',
    reason: '무단결석',
    plusP: 0,
    minusP: 2,
  },
  {
    date: '2022-08-22',
    name: '박김김',
    reason: '지각 2회',
    plusP: 0,
    minusP: 12,
  },
  {
    date: '2022-08-22',
    name: '옥수수',
    reason: '그냥',
    plusP: 1,
    minusP: 0,
  },
];

const PointTable = ({ curSort, pointData, setPointData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  }); //탭 크기가 변할때마다 페이지를 재렌더링하기위한 state
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
    setPointData(testData);
  }, [curSort]);

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
            <th className="min-w-[7em] w-full sm:w-[7em] px-1">이름</th>
            {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
            <th className="hidden sm:block sm:w-full px-1">사유</th>
            <th className="min-w-[3em] sm:w-[6em] px-1">상점</th>
            <th className="min-w-[3em] sm:w-[6em] px-1">벌점</th>
          </div>
        </tr>
        {(curSort === '명부'
          ? pointData.sort(compareName)
          : pointData.sort(compareRanking)
        ).map((data, index) => (
          <button
            key={index}
            className={
              (curSort === '랭킹' && data.plusP && index < 3
                ? 'border-mainYellow'
                : '') +
              (curSort === '랭킹' && data.plusP - data.minusP < -9
                ? ' border-red-400'
                : '') +
              ' border rounded-md flex w-full mt-1'
            }
            onClick={() => {
              setModalData({ ...data, no: index + 1 });
              setIsOpen(true);
            }}
            disabled={window.innerWidth > parseInt(smWidth, 10)}
          >
            <td className="min-w-[2em] w-[2em] p-1">{index + 1}</td>
            <div className="flex w-full">
              <td className="min-w-[7em] w-full sm:w-[7em] p-1">{data.name}</td>
              {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
              <td className="hidden sm:block sm:w-full p-1">{data.reason}</td>
              <td className="min-w-[3em] sm:w-[6em] p-1 border-x">
                {data.plusP !== 0 ? data.plusP : ''}
              </td>
              <td className="min-w-[3em] sm:w-[6em] p-1">
                {data.minusP !== 0 ? data.minusP : ''}
              </td>
            </div>
          </button>
        ))}
      </table>
    </div>
  );
};

export default PointTable;
