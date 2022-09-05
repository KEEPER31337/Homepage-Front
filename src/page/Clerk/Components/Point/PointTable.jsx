import React, { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { connect } from 'react-redux';

import ReasonModal from '../Point/ReasonModal';
import { compareName, compareRanking } from '../ReasonOfPoint/PointUtil';
import firstGradeBadge from 'assets/img/ctfImg/badge_grade_first.gif';
import firstGradeBadgeDark from 'assets/img/ctfImg/badge_grade_first_dark.gif';
import secondGradeBadge from 'assets/img/ctfImg/badge_grade_second.png';
import secondGradeBadgeDark from 'assets/img/ctfImg/badge_grade_second_dark.png';
import thirdGradeBadge from 'assets/img/ctfImg/badge_grade_third.png';
import thirdGradeBadgeDark from 'assets/img/ctfImg/badge_grade_third_dark.png';
import clerkAPI from 'API/v1/clerk';

const PointTable = ({ curSort, pointData, setPointData, state }) => {
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

  const isDark = state.darkMode;
  const token = state.member.token;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    clerkAPI.getPointOfMember({ token }).then((res) => {
      console.log(res);
      if (res.success) setPointData(res.list);
    });
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
        {pointData?.length !== 0 ? (
          (curSort === '명부'
            ? pointData.sort(compareName)
            : pointData.sort(compareRanking)
          ).map((data, index) => (
            <button
              key={index}
              className={
                (curSort === '랭킹' && data.totalMerit && index < 3
                  ? 'border-2 border-slate-300 bg-slate-100 font-bold'
                  : 'border') +
                (curSort === '랭킹' && data.totalMerit - data.totalDemerit < -9
                  ? ' border-red-400'
                  : ' ') +
                ' rounded-md flex w-full mt-1'
              }
              onClick={() => {
                setModalData({ ...data, no: index + 1 });
                setIsOpen(true);
              }}
              disabled={window.innerWidth > parseInt(smWidth, 10)}
            >
              <td className="min-w-[2em] w-[2em] p-1">
                {curSort === '랭킹' && data.plusP ? (
                  index === 0 ? (
                    <img
                      className=""
                      src={isDark ? firstGradeBadgeDark : firstGradeBadge}
                    />
                  ) : index === 1 ? (
                    <img
                      className=""
                      src={isDark ? secondGradeBadgeDark : secondGradeBadge}
                    />
                  ) : index === 2 ? (
                    <img
                      className=""
                      src={isDark ? thirdGradeBadgeDark : thirdGradeBadge}
                    />
                  ) : (
                    index + 1
                  )
                ) : (
                  index + 1
                )}
              </td>
              <div className="flex w-full">
                <td className="min-w-[7em] w-full sm:w-[7em] p-1">
                  {data.name}
                </td>
                {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
                <td className="hidden sm:block sm:w-full p-1">{data.reason}</td>
                <td
                  className={
                    (curSort === '랭킹' && data.plusP && index < 3
                      ? 'border-slate-400'
                      : '') +
                    (curSort === '랭킹' && data.plusP - data.minusP < -9
                      ? ' border-red-400'
                      : ' ') +
                    ' min-w-[3em] sm:w-[6em] p-1 border-x'
                  }
                >
                  {data.plusP !== 0 ? data.plusP : ''}
                </td>
                <td
                  className={
                    (curSort === '랭킹' && data.plusP - data.minusP < -9
                      ? ' text-red-500'
                      : ' ') + ' min-w-[3em] sm:w-[6em] p-1'
                  }
                >
                  {data.minusP !== 0 ? data.minusP : ''}
                </td>
              </div>
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center h-20 text-slate-300 ">
            상벌점 정보를 불러오는데 실패했습니다.
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
export default connect(mapStateToProps)(PointTable);
