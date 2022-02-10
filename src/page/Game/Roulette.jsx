import React from 'react';
import { useState } from 'react';

const Roulette = () => {
  const points = [1, 2, 3, 4, 5, 6, 7, 8];
  const pointIdx = 7;
  const [stopPoint, setStopPoint] = useState(0);
  const [ani, setAni] = useState('animate-none');
  const onClick = () => {
    console.log('click');
    setAni('animate-spin');
    setStopPoint(points.length - pointIdx);
    setTimeout(function () {
      setAni('animate-none');
    }, 3000);
  };

  return (
    <div className="border border-divisionGray items-center m-10">
      <div className="m-0 p-0 bg-slate-600 flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
            <div className="mt-2 w-0 h-0 border-t-green-600 border-t-[15px] border-r-transparent border-r-[5px] border-l-transparent border-l-[5px]"></div>
          </div>
          <button
            onClick={onClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-cyan-300 uppercase border-8 border-solid border-cyan-600 font-bold text-gray-500 w-20 h-20 rounded-full cursor-pointer outline-none"
          >
            Spin
          </button>

          <div
            className={`${ani} w-52 h-52 bg-slate-100 border-solid border-8 rounded-full relative overflow-hidden`}
          >
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-red-600  rotate-[${
                (0 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-1/2`}
            >
              {points[0]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-orange-600 rotate-[${
                (45 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[1]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-yellow-600 rotate-[${
                (90 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[2]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-green-600 rotate-[${
                (135 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[3]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-blue-600 rotate-[${
                (180 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[4]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-purple-600 rotate-[${
                (225 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[5]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-gray-600 rotate-[${
                (270 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[6]}
            </div>
            <div
              className={`[clip-path:polygon(100%_0,_50%_100%,_0_0)] bg-slate-100 rotate-[${
                (315 + 45 * stopPoint) % 360
              }deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-center flex items-center justify-center text-xl font-bold left-24`}
            >
              {points[7]}
            </div>
          </div>
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
