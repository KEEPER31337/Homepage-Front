import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// local
import MessageModal from 'shared/MessageModal';
import actionMember from 'redux/action/member';

// API
import rouletteAPI from 'API/v1/game';
import memberAPI from 'API/v1/member';

const MAX_PLAY_ROULETTE = 3;

const Roulette = ({ gameInfo, member, updateInfo }) => {
  useEffect(() => {
    rouletteAPI
      .getRouletteInfo({
        token: member.token,
      })
      .then((data) => {
        setRemainingCount(MAX_PLAY_ROULETTE - data.data.roulettePerDay);
        setTodayResult(data.data.todayResult);
      });
  }, [member]);

  // 알림
  const alertCountModalRef = useRef({});
  const alertLoginModalRef = useRef({});
  const alertPointLackModalRef = useRef({});

  // 게임 상에서 띄워줄 정보
  const [memberPoint, setMemberPoint] = useState(member.memberInfo.point);
  const [todayResult, setTodayResult] = useState(0);
  const [remainingCount, setRemainingCount] = useState(MAX_PLAY_ROULETTE);

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

  // 게임 동작 관련
  const [ani, setAni] = useState('animate-none');
  const spinAndStop = (points, pointIdx) => {
    setAni('animate-[spin_0.3s_linear_infinite]');
    setTimeout(() => {
      const rotateDegree = (0 + 45 * (points.length - pointIdx)) % 360;
      setAni(`animate-none rotate-[${rotateDegree}deg]`);
      setTimeout(() => {
        alert('획득 포인트 : ' + points[pointIdx]);
        memberAPI.getMember({ token: member.token }).then((data) => {
          // 포인트 정보 업데이트
          if (data.success) {
            const token = member.token;
            const memberInfo = data.data;
            updateInfo({ token, memberInfo });
            // setMemberPoint(memberInfo.point);
            setMemberPoint(data.data.point);
          }
        });
        rouletteAPI
          .getRouletteInfo({
            token: member.token,
          })
          .then((data) => {
            setTodayResult(data.data.todayResult);
          });
      }, 500);
    }, 2000);
  };

  const onClick = () => {
    if (member.token === '') {
      alertLoginModalRef.current.open();
      return;
    }
    if (member.memberInfo.point < gameInfo.ROULETTE_FEE) {
      alertPointLackModalRef.current.open();
      return;
    }
    rouletteAPI
      .checkRouletteCount({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          if (!data.data) {
            // 3회 초과 안 했을 때
            rouletteAPI
              .playRoulette({
                token: member.token,
              })
              .then((data) => {
                if (data.success) {
                  setRemainingCount(
                    MAX_PLAY_ROULETTE - data.data.roulettePerDay
                  );
                  setPoints(data.data.roulettePoints);
                  setMemberPoint((prev) => prev - gameInfo.ROULETTE_FEE); // 참가 포인트 차감되는 거 보여주기
                  rouletteAPI
                    .getRouletteInfo({
                      token: member.token,
                    })
                    .then((data) => {
                      setTodayResult((prev) => prev - gameInfo.ROULETTE_FEE);
                    });
                  spinAndStop(
                    data.data.roulettePoints,
                    data.data.roulettePointIdx
                  );
                } else console.log('no play');
              });
          } else {
            //3회 초과했을 때
            alertCountModalRef.current.open();
          }
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
    <div className="relative w-full md:w-3/5 pb-10 sm:p-10 mb-10 flex flex-wrap justify-center sm:justify-start bg-gradient-radial from-gray-700 to-gray-900 dark:from-pink-300 dark:via-purple-300 dark:to-indigo-400 rounded-md border-[16px] border-mainBlack">
      <div className="relative">
        <div className="shadow-inner shadow-[#725d19] [clip-path:polygon(95%_0,_50%_100%,_5%_0)] rotate-[180deg] top-8 bg-gradient-radial from-amber-900 to-yellow-300 brightness-110 h-1/2 w-2/3 absolute left-1/2 -translate-x-1/2 origin-bottom rounded-3xl"></div>
        <div className="my-2 mx-2 sm:m-0 shadow-md shadow-[#725d19] rounded-full bg-gradient-to-tr from-amber-900 to-yellow-300 brightness-125">
          <div
            className={`${ani} w-52 h-52 xl:w-80 xl:h-80 brightness-125 border-white border-solid border-8 border-opacity-0 rounded-full relative overflow-hidden`}
          >
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#850808] to-[#780103] dark:from-pink-400 dark:via-purple-500 dark:to-indigo-400 rotate-[0deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[0]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#780103] to-[#5a0606] dark:from-pink-500 dark:via-purple-600 dark:to-indigo-400 rotate-[45deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[1]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#5a0606] to-[#500305] dark:from-pink-500 dark:via-purple-500 dark:to-indigo-400 rotate-[90deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[2]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#500305] to-[#940202f3] dark:from-pink-600 dark:via-purple-600 dark:to-indigo-400 rotate-[135deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[3]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#940202] to-[#780103] dark:from-pink-400 dark:via-purple-500 dark:to-indigo-400 rotate-[180deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[4]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#780103] to-[#5a0606] dark:from-pink-500 dark:via-purple-600 dark:to-indigo-400 rotate-[225deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[5]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#5a0606] to-[#500305] dark:from-pink-500 dark:via-purple-500 dark:to-indigo-400 rotate-[270deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
            >
              {points[6]}
            </div>
            <div
              className={`pb-10 shadow-inner [clip-path:polygon(92%_0,_50%_100%,_8%_0)] bg-gradient-to-t from-[#500305] to-[#940202f3] dark:from-pink-600 dark:via-purple-600 dark:to-indigo-400 rotate-[315deg] h-1/2 w-1/2 absolute -translate-x-1/2 origin-bottom text-[#cdb672] text-center text-lg xl:text-2xl font-bold flex items-center justify-center left-1/2`}
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
          className="brightness-110 shadow-xl shadow-[#5c0806] dark:shadow-pink-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black uppercase border-[5px] xl:border-8 border-solid border-mainYellow font-bold text-[#cdb672] text-sm xl:text-lg w-12 h-12 xl:w-20 xl:h-20 rounded-full cursor-pointer outline-none"
        >
          Spin
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-none order-first sm:order-none sm:absolute sm:inset-y-5 sm:right-5 py-2 sm:py-3 pl-5 sm:px-5 lg:p-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/3 h-fit sm:h-auto bg-gray-900 rounded-md shadow-md text-amber-200 text-xs sm:text-base xl:text-lg">
        {infos.map((info) => (
          <div
            key={info.subtitle}
            className="items-center inline-block sm:block lg:flex"
          >
            <div className="sm:flex-shrink-0">
              <div className="md:w-24 lg:w-32">{info.subtitle}</div>
            </div>
            <div className="w-16 sm:w-auto px-2 tabular-nums bg-gray-300 bg-opacity-10 rounded-md">
              {info.content}
            </div>
          </div>
        ))}
      </div>
      <MessageModal ref={alertCountModalRef}>
        룰렛은 하루 3회만 참여 가능합니다.
      </MessageModal>
      <MessageModal ref={alertLoginModalRef}>
        로그인 후 이용해주십시오.
      </MessageModal>
      <MessageModal ref={alertPointLackModalRef}>
        포인트가 부족합니다.
      </MessageModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roulette);
