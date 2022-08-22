import React, { useState, useEffect } from 'react';

const Preason = [
  { no: 1, text: '각종 대외발표', point: 2 },
  { no: 2, text: '우수 기술문서 작성', point: 3 },
  { no: 3, text: '연 2개 이상의 기술문서 작성', point: 3 },
  { no: 4, text: '우수 스터디 진행', point: 3 },
  { no: 5, text: '개근상', point: 3 },
  { no: 6, text: '전공 관련 대회 입상', point: 5 },
  { no: 7, text: '기타', point: '' },
];
const Mreason = [
  { no: 1, text: '무단 결석', point: 2 },
  { no: 2, text: '지각 2회', point: 2 },
  { no: 3, text: '회비 미납부', point: 1 },
  { no: 4, text: '기술문서 불참', point: 5 },
  { no: 5, text: '기타', point: '' },
];

const WriteTableCell = ({ no, pointData, setPointData }) => {
  const [isETC, setIsETC] = useState(false);
  const [oneData, setOneData] = useState(pointData[no - 1]);
  useEffect(() => {
    //한 셀의 데이터 변경시 최종 데이터 리스트 업데이트
    setPointData(
      pointData.map((data) => {
        if (data.no === no) return oneData;
        return data;
      })
    );
  }, [oneData]);

  //pm이 바뀔 때
  useEffect(() => {
    setOneData({ ...oneData, reason: '1' });
  }, [oneData.pm]);

  //isEtc가 바뀔 때마다
  useEffect(() => {
    setOneData({ ...oneData, etcReason: '' });
  }, [isETC]);

  //pm이 바뀜으로써 reason이 바뀔 때 point 값도 같이 업데이트 되도록
  useEffect(() => {
    if (oneData.pm === 'p') {
      if (oneData.reason === '7') {
        setIsETC(true);
      } else {
        setIsETC(false);
      }
      const point = Preason[Number(oneData.reason) - 1]?.point;
      setOneData({ ...oneData, point: point });
    } else {
      if (oneData.reason === '5') {
        setIsETC(true);
      } else {
        setIsETC(false);
      }
      const point = Mreason[Number(oneData.reason) - 1]?.point;
      setOneData({ ...oneData, point: point });
    }
  }, [oneData.reason]);

  return (
    <tr
      key={no}
      className="flex w-full items-center border mt-1 shadow-sm rounded-md"
    >
      <td className=" min-w-[2em] p-1 text-center">{no}</td>
      <tbody className="flex flex-col w-full">
        <div className="flex w-full">
          <td className="border-x  w-full sm:w-[10em] p-1">
            <input
              type="text"
              className="inline-block px-3 py-2 w-full text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
              onChange={(e) =>
                //TODO 검색하는 기능의 함수로 대체하고 setOneData()은 엔터키를 누르거나 사용자를 선택했을 때 동작하도록
                setOneData({ ...oneData, name: e.target.value })
              }
            />
          </td>
          <td className="min-w-[6em] w-[6em] sm:w-[10em] p-1">
            <select
              className={
                (oneData.pm === 'p' ? 'text-green-500' : 'text-red-500') +
                ' w-full inline-block pl-3  py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent'
              }
              onChange={(e) => setOneData({ ...oneData, pm: e.target.value })}
              value={oneData.pm}
              required
            >
              <option className="text-red-500" value="m">
                벌점
              </option>
              <option className="text-green-500" value="p">
                상점
              </option>
            </select>
          </td>
          <td className="hidden sm:flex flex-col gap-1 border-x w-full p-1">
            <select
              className="w-full  pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
              onChange={(e) =>
                setOneData({ ...oneData, reason: e.target.value })
              }
              value={oneData.reason}
              required
            >
              {oneData.pm === 'p'
                ? Preason.map((reason) => (
                    <option key={reason.no} value={reason.no}>
                      {reason.text}
                    </option>
                  ))
                : Mreason.map((reason) => (
                    <option key={reason.no} value={reason.no}>
                      {reason.text}
                    </option>
                  ))}
            </select>
            {isETC ? (
              <input
                type="text"
                className="inline-block px-3 py-2 w-full text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-xs rounded-md dark:bg-mainBlack dark:border-darkComponent"
                placeholder="기타 사유"
                value={oneData.etcReason}
                onChange={(e) =>
                  setOneData({ ...oneData, etcReason: e.target.value })
                }
              />
            ) : (
              ''
            )}
          </td>
          <td className="min-w-[6em] w-[6em] p-1">
            <input
              type="number"
              min="0"
              max="10"
              className="inline-block pl-3 pr-0 w-[4em] py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
              defaultValue={2}
              value={oneData.point}
              onBlur={(e) => setOneData({ ...oneData, point: e.target.value })}
            />
            점
          </td>
        </div>
        <div
          name="모바일 사유"
          className="flex border-t border-l bg-slate-100 p-1 items-center sm:hidden"
        >
          <span className="w-[4em] text-center font-bold">사유</span>
          <div className="flex flex-col w-full gap-1">
            <select
              className="w-full inline-block pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-sm rounded-md dark:bg-mainBlack dark:border-darkComponent"
              onChange={(e) =>
                setOneData({ ...oneData, reason: e.target.value })
              }
              value={oneData.reason}
              required
            >
              {oneData.pm === 'p'
                ? Preason.map((reason) => (
                    <option key={reason.no} value={reason.no}>
                      {reason.text}
                    </option>
                  ))
                : Mreason.map((reason) => (
                    <option key={reason.no} value={reason.no}>
                      {reason.text}
                    </option>
                  ))}
            </select>
            {isETC ? (
              <input
                type="text"
                className="inline-block px-3 py-2 w-full text-sm border-gray-300 focus:outline-none focus:ring-violet-400 focus:border-violet-400 sm:text-xs rounded-md dark:bg-mainBlack dark:border-darkComponent"
                placeholder="기타 사유"
                value={oneData.etcReason}
                onChange={(e) =>
                  setOneData({ ...oneData, etcReason: e.target.value })
                }
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </tbody>
    </tr>
  );
};

export default WriteTableCell;
