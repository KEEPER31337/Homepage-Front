import React, { useState, useEffect } from 'react';

const ViewTable = ({ curYear, recordData, setRecordData }) => {
  useEffect(() => {}, []);
  useEffect(() => {
    console.log(curYear);
    setRecordData(recordData);
  }, [curYear]);

  return (
    <div className="bg-mainWhite rounded-md p-2">
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
        {recordData.map((data, index) => (
          <tr key={index} className="flex border-b">
            <td className="min-w-[2em] w-[2em] p-1">{index + 1}</td>
            <div className="flex w-full">
              <td className="min-w-[7em] w-[7em] p-1">{data.date}</td>
              <td className="min-w-[4em] w-full p-1">{data.name}</td>
              {/**모바일에서 내역을 클릭하면 모달창으로 사유를 띄워주도록*/}
              <td className="hidden sm:block sm:w-full p-1 text-left">
                {data.reason}
              </td>
              <td className="min-w-[3em] sm:w-[6em] p-1 border-x">
                {data.plusP !== 0 ? data.plusP : ''}
              </td>
              <td className="min-w-[3em] sm:w-[6em] p-1">
                {data.minusP !== 0 ? data.minusP : ''}
              </td>
            </div>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ViewTable;
