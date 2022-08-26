import React, { useState, useEffect } from 'react';

import WriteTableCell from './WriteTableCell';
import { getNow } from './PointUtil';

const WriteTable = ({ appendData, setAppendData }) => {
  useEffect(() => {
    setAppendData([
      {
        no: 1,
        name: '',
        pm: 'm',
        reason: '1',
        etcReason: '',
        point: 2,
        date: getNow(),
      },
    ]);
  }, []);

  return (
    <table className="w-full">
      <tr className="flex border-b text-left">
        <th className="min-w-[2em] w-[2em] px-1">No</th>
        <div className="flex w-full">
          <th className="min-w-[7em] px-1">날짜</th>
          <th className="min-w-[7em] w-full sm:w-[10em] px-1">이름</th>
          <th className="min-w-[6em] w-[6em] sm:w-[10em] px-1">상/벌점</th>
          <th className="hidden sm:table-cell w-full px-1">사유</th>
          <th className="hidden sm:table-cell min-w-[6em] w-[6em] px-1">
            점수
          </th>
        </div>
      </tr>
      {appendData.map((data) => (
        <WriteTableCell
          no={data.no}
          appendData={appendData}
          setAppendData={setAppendData}
        />
      ))}
    </table>
  );
};

export default WriteTable;
