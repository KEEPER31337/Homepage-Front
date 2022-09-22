import React, { useState, useEffect, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import { connect } from 'react-redux';

import AuthModal from '../Components/AuthModal';
import PointTable from '../Components/Point/PointTable';

const ways = ['명부', '랭킹'];

const Point = ({ state }) => {
  const [pointData, setPointData] = useState([]);
  const [curSort, setCurSort] = useState(ways[0]);
  const token = state?.member?.token;
  const auth = ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'];
  const jobs = state?.member?.memberInfo?.jobs;
  const ModalRef = useRef({});
  useEffect(() => {
    setCurSort(ways[0]);
  }, []);
  useEffect(() => {
    if (!jobs?.some((i) => auth.includes(i))) {
      ModalRef.current.open();
    }
  }, []);

  return (
    <>
      <div className="flex flex-1 justify-center min-h-screen">
        <div className="flex flex-col gap-y-4 w-full p-2 bg-gray-100 sm:bg-transparent dark:bg-transparent">
          <div
            name="상벌점 추가 내역"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2  bg-mainWhite sm:bg-gray-100 dark:bg-darkComponent dark:text-mainWhite dark:border-transparent"
          >
            <p className="text-2xl">회원별 상벌점 누계</p>
            <div name="연도 선택"></div>
            <div className="flex flex-col gap-y-2 pl-2">
              <div className="flex flex-wrap gap-2 justify-center p-4">
                {ways.map((way, index) => (
                  <button
                    key={index}
                    className={
                      (curSort === way
                        ? 'ring-2 ring-violet-400 ring-offset-4 ring-offset-gray-100 bg-violet-400 dark:ring-offset-darkComponent dark:ring-violet-600 dark:bg-violet-600'
                        : 'bg-violet-200 hover:bg-violet-400 dark:bg-violet-400 dark:hover:bg-violet-500 dark:border-2 dark:border-violet-600') +
                      ' shadow-sm rounded-md p-1 px-4 focus:outline-none'
                    }
                    onClick={() => {
                      setCurSort(way);
                    }}
                    disabled={curSort === way}
                  >
                    {way}
                  </button>
                ))}
              </div>
              <PointTable
                curSort={curSort}
                pointData={pointData}
                setPointData={setPointData}
              />
            </div>
          </div>
        </div>
      </div>
      <AuthModal ref={ModalRef}>접근 권한이 없습니다.</AuthModal>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Point);
