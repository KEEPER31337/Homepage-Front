import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// API
import rouletteAPI from 'API/v1/game';
import memberAPI from 'API/v1/member';

const Roulette = ({ gameInfo, member }) => {
  useEffect(() => {
    memberAPI.getMember({ token: member.token }).then((data) => {
      if (data.success) {
        setMemberPoint(data.data.point);
      }
    });
    rouletteAPI
      .getInfoRoulette({
        token: member.token,
      })
      .then((data) => {
        setRemainingCount(3 - data.data.roulettePerDay);
        //TODO setTodayResult(data.data.todayResult);
      });
  }, [member]);

  // 게임 상에서 띄워줄 정보
  const [memberPoint, setMemberPoint] = useState(member.memberInfo.point);
  const [todayResult, setTodayResult] = useState(0); // TODO api 업데이트 되면 받아오기
  const [remainingCount, setRemainingCount] = useState(3);

  // 게임 실행 후 띄워줄 정보
  const [points, setPoints] = useState([
    '?',
    '?',
    '?',
    '?',
    '?',
    '?',
    '?',
    '?',
  ]);
  const [pointIdx, setPointIdx] = useState(0);

  // 게임 동작 관련
  const [ani, setAni] = useState('animate-none');
  const spinAndStop = (points, pointIdx) => {
    setAni('animate-[spin_0.3s_linear_infinite]');
    setTimeout(function () {
      const rotateDegree = (0 + 45 * (points.length - pointIdx)) % 360;
      setAni(`animate-none rotate-[${rotateDegree}deg]`);
      setTimeout(function () {
        alert('획득 포인트 : ' + points[pointIdx]);
        memberAPI.getMember({ token: member.token }).then((data) => {
          // 포인트 정보 업데이트
          if (data.success) {
            setMemberPoint(data.data.point);
          }
        });
        rouletteAPI
          .getInfoRoulette({
            token: member.token,
          })
          .then((data) => {
            // TODO 오늘 결과 업데이트
            //setTodayResult(data.data.todayResult);
          });
      }, 500);
    }, 2000);
  };

  const onClick = () => {
    rouletteAPI
      .checkRouletteCount({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          console.log('횟수 제한', data);
          if (!data.data) {
            // 3회 초과 안 했을 때
            console.log('실행');
            rouletteAPI
              // ANCHOR API 지금 안 되는 상태
              .playRoulette({
                token: member.token,
              })
              .then((data) => {
                if (data.success) {
                  console.log('play', data);
                  setRemainingCount(3 - data.data.roulettePerDay);
                  setPoints(data.data.roulettePoints);
                  setPointIdx(data.data.roulettePointIdx);
                  setMemberPoint((prev) => prev - gameInfo.ROULETTE_FEE); // 참가 포인트 차감되는 거 보여주기
                  spinAndStop(
                    data.data.roulettePoints,
                    data.data.roulettePointIdx
                  );
                } else console.log('no play');
              });
          } else {
            //3회 초과했을 때
            console.log('오늘 할당된 횟수를 다 하셨습니다.');
          }
        } else {
          alert('로그인 후 이용해주십시오.');
        }
      });
  };

  const infos = [
    {
      subtitle: '보유 포인트',
      content: memberPoint,
    },
    {
      subtitle: '참가 포인트',
      content: gameInfo.ROULETTE_FEE,
    },
    {
      subtitle: '오늘 결과',
      content: todayResult,
    },
    {
      subtitle: '잔여 횟수',
      content: remainingCount,
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

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
export default connect(mapStateToProps)(Roulette);
