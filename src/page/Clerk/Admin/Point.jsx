import React, { useState, useEffect } from 'react';
import AuthUser from 'shared/AuthUser';

import PointTable from '../Components/Point/PointTable';
import {
  compareName,
  compareRanking,
} from '../Components/ReasonOfPoint/PointUtil';

const ways = ['명부', '랭킹'];

const Point = () => {
  const [pointData, setPointData] = useState([]);
  const [curSort, setCurSort] = useState(ways[0]);

  useEffect(() => {
    setCurSort(ways[0]);
  }, []);

  return (
    <AuthUser>
      <div className="flex flex-1 justify-center min-h-screen">
        <div className="flex flex-col gap-y-4 w-full p-2 bg-gray-100 sm:bg-transparent">
          <div
            name="상벌점 추가 내역"
            className="flex flex-col gap-y-2 rounded-md border w-full p-2  bg-mainWhite sm:bg-gray-100"
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
                        ? 'ring-2 ring-violet-400 ring-offset-4 ring-offset-gray-100 bg-violet-400'
                        : 'bg-violet-200 hover:bg-violet-400') +
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
    </AuthUser>
  );
};

export default Point;
