import React, { useEffect } from 'react';

import WriteTableCell from './WriteTableCell';
import { getNow } from './PointUtil';

const WriteTable = ({
  appendData,
  setAppendData,
  Preason,
  Mreason,
  memberList,
  isChanged,
}) => {
  useEffect(() => {
    setAppendData([
      {
        no: 1,
        member: null,
        pm: 'm',
        index: 0,
        typeId: Mreason[0]?.id,
        point: Mreason[0]?.merit,
        date: getNow(),
      },
    ]);
  }, []);
  return (
    <div className="w-full">
      <p className="flex border-b text-left font-bold dark:border-gray-600">
        <p className="min-w-[2em] w-[2em] px-1">No</p>
        <div className="flex w-full">
          <p className="min-w-[7em] px-1">날짜</p>
          <p className="min-w-[7em] w-full sm:w-[10em] px-1">이름</p>
          <p className="min-w-[6em] w-[6em] sm:w-[10em] px-1">상/벌점</p>
          <p className="hidden sm:table-cell w-full px-1">사유</p>
          <p className="hidden sm:table-cell min-w-[6em] w-[6em] px-1">점수</p>
        </div>
      </p>
      {appendData?.map((data) => (
        <WriteTableCell
          no={data.no}
          appendData={appendData}
          setAppendData={setAppendData}
          Preason={Preason}
          Mreason={Mreason}
          memberList={memberList}
          isChanged={isChanged}
        />
      ))}
    </div>
  );
};

export default WriteTable;
