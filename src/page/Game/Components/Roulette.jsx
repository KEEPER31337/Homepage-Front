import React from 'react';
import { useState } from 'react';

const Roulette = () => {
  const points = [40, 90, 100, 300, 400, 500, 900, 5000];
  const pointIdx = 4;
  const [stopPoint, setStopPoint] = useState(0);
  const [ani, setAni] = useState('animate-none');
  const onClick = () => {
    console.log('click');
    setAni('animate-[spin_0.3s_linear_infinite]');
    setStopPoint(points.length - pointIdx);
    setTimeout(function () {
      setAni(
        'animate-none' +
          ' rotate-[' +
          ((0 + 45 * (points.length - pointIdx)) % 360) +
          'deg]'
        // 'animate-none' + ' rotate-[' + ((0 + 45 * stopPoint) % 360) + 'deg]'
        // FIXME stopPoint setStopPoint 적용한 값 안 돼서 일단 계산식으로 바로 박아 놓음
      );
    }, 3000);
  };

  const infos = [
    {
      subtitle: '보유 포인트',
      content: 2466897,
    },
    {
      subtitle: '참가 포인트',
      content: 100,
    },
    {
      subtitle: '오늘 결과',
      content: 10000,
    },
    {
      subtitle: '잔여 횟수',
      content: 3,
    },
  ];

  return (
    <div className="relative w-3/5 pb-10 sm:p-10 mb-10 flex flex-wrap justify-center sm:justify-start bg-gradient-radial from-gray-700 to-gray-900 rounded-md border-[16px] border-mainBlack dark:border-divisionGray">
      <div className="relative">
        <div className="shadow-inner shadow-[#725d19] [clip-path:polygon(95%_0,_50%_100%,_5%_0)] rotate-[180deg] top-8 bg-gradient-radial from-amber-900 to-yellow-300 brightness-110 h-1/2 w-2/3 absolute left-1/2 -translate-x-1/2 origin-bottom rounded-3xl"></div>
        <div className="my-2 mx-2 sm:m-0 shadow-md shadow-[#725d19] rounded-full bg-gradient-to-tr from-amber-900 to-yellow-300 brightness-125">
          <div
            className={`${ani} w-52 h-52 brightness-125 border-white border-solid border-8 border-opacity-0 rounded-full relative overflow-hidden`}
          >
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#850808] to-[#780103] rotate-[0deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-1/2`}
            >
              {points[0]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#780103] to-[#5a0606] rotate-[45deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[1]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#5a0606] to-[#500305] rotate-[90deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[2]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#500305] to-[#940202f3] rotate-[135deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[3]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#940202] to-[#780103] rotate-[180deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[4]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#780103] to-[#5a0606] rotate-[225deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[5]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#5a0606] to-[#500305] rotate-[270deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[6]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#500305] to-[#940202f3] rotate-[315deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg font-bold flex items-center justify-center left-24`}
            >
              {points[7]}
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="brightness-110 mt-4 sm:mt-2 w-0 h-0 border-t-mainYellow border-t-[15px] border-r-transparent border-r-[5px] border-l-transparent border-l-[5px]"></div>
        </div>
        <button
          onClick={onClick}
          className="brightness-110 shadow-xl shadow-[#5c0806] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black uppercase border-[5px] border-solid border-mainYellow font-bold text-[#cdb672] text-sm w-12 h-12 rounded-full cursor-pointer outline-none"
        >
          Spin
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-none order-first sm:order-none sm:absolute sm:inset-y-5 sm:right-5 py-2 sm:py-3 pl-5 sm:px-5 lg:p-5 w-full sm:w-1/2 xl:w-1/3 h-fit sm:h-auto bg-gray-900 rounded-md shadow-md text-amber-200 text-xs sm:text-base">
        {infos.map((info) => (
          <div
            key={info.subtitle}
            className="items-center inline-block sm:block lg:flex"
          >
            <div className="sm:flex-shrink-0">
              <div className="sm:w-24">{info.subtitle}</div>
            </div>
            <div className="w-16 sm:w-auto px-2 tabular-nums bg-gray-300 bg-opacity-10 rounded-md">
              {info.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RuleOfRoulette = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 my-5 p-5 border-2 border-divisionGray">
        게임 규칙
        <br />
        매일 3번까지 실행 가능합니다.
        <br />
        SPIN 버튼을 눌려 룰렛을 돌립니다.
        <br />
        룰렛이 멈춘 후 당첨 포인트가 수령됩니다.
      </div>
    </div>
  );
};

export { Roulette, RuleOfRoulette };
