import React from 'react';
import { useState } from 'react';

const Roulette = () => {
  const points = [1, 2, 3, 4, 5, 6, 7, 8];
  const pointIdx = 4;
  const [stopPoint, setStopPoint] = useState(0);
  const [ani, setAni] = useState('animate-none');
  const onClick = () => {
    console.log('click');
    setAni('animate-spin');
    setStopPoint(points.length - pointIdx);
    setTimeout(function () {
      setAni(
        'animate-none' +
          ' rotate-[' +
          ((0 + 45 * (points.length - pointIdx)) % 360) +
          'deg]'
        // stopPoint setStopPoint 적용한 값 안 돼서 일단 계산식으로 바로 박아 놓음
      );
    }, 3000);
  };

  return (
    <div className="border border-divisionGray items-center m-10">
      <div className="m-0 p-0 bg-white flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="shadow-md shadow-gray-700 rounded-full">
            <div
              className={`${ani} w-52 h-52 bg-slate-100 border-black border-solid border-8 rounded-full relative overflow-hidden`}
            >
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#940202f3] rotate-[0deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-1/2`}
              >
                {points[0]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#780103] rotate-[45deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[1]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#5a0606] rotate-[90deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[2]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#500305] rotate-[135deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[3]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#940202f3] rotate-[180deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[4]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#780103] rotate-[225deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[5]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#5a0606] rotate-[270deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[6]}
              </div>
              <div
                className={`[clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-[#500305] rotate-[315deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
              >
                {points[7]}
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="mt-2 w-0 h-0 border-t-mainYellow border-t-[15px] border-r-transparent border-r-[5px] border-l-transparent border-l-[5px]"></div>
          </div>
          <button
            onClick={onClick}
            className="shadow-xl shadow-[#5c0806] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black uppercase border-[5px] border-solid border-mainYellow font-bold text-gray-500 w-12 h-12 rounded-full cursor-pointer outline-none"
          >
            Spin
          </button>
        </div>
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
        매일 3번까지 구매 가능합니다.
        <br />
        start 버튼을 눌려 주사위를 굴립니다.
        <br />
        수령을 클릭하면 당첨 포인트가 수령됩니다.
      </div>
    </div>
  );
};

export { Roulette, RuleOfRoulette };
