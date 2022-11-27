import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// img
import scratchCardImageSrc from '../img/Lotto/scratchCard.png';
import win1 from '../img/Lotto/win1.png';
import win2 from '../img/Lotto/win2.png';
import win3 from '../img/Lotto/win3.png';
import win4 from '../img/Lotto/win4.png';
import win5 from '../img/Lotto/win5.png';
import win6 from '../img/Lotto/win6.png';

// local
import lottoAPI from 'API/v1/game';
import memberAPI from 'API/v1/member';
import MessageModal from 'shared/MessageModal';
import actionMember from 'redux/action/member';

const width = 350; //캔버스 크기
const height = 500;
const strokeWidth = 130; //브러쉬 굵기
const completedAt = 70; //70% 이상 긁어야함

const Lotto = ({ member, gameInfo, updateInfo }) => {
  // ref
  const backgroundCanvasRef = useRef(null);
  const scratchCardCanvasRef = useRef(null);

  //modal
  const alertShowResultModalRef = useRef({});
  const alertCountModalRef = useRef({});
  const alertBuyFirstModalRef = useRef({});
  const alertLoginModalRef = useRef({});
  const alertPointLackModalRef = useRef({});

  //scratch
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPop, setIsPop] = useState(false);

  //게임 후, 등수와 포인트 띄워줌
  const [rank, setRank] = useState(0);
  const [point, setPoint] = useState(0);

  // 게임 상에서 띄워줄 정보
  const [memberPoint, setMemberPoint] = useState(member.memberInfo.point);
  const [remainingCount, setRemainingCount] = useState();
  const [todayResult, setTodayResult] = useState(0);
  const [overCountCheck, setOverCountCheck] = useState(false);

  //진행 과정 몇 %인지
  const [progress, setProgress] = useState(0);
  //alert창 한번만 띄우기 위해서
  const [isCompleted, setIsCompleted] = useState(false);

  //초기 캔버스 이미지 불러오기
  useEffect(() => {
    const scratchCardCanvas = scratchCardCanvasRef.current;
    const scratchCardContext = scratchCardCanvas.getContext('2d');
    const backgroundCanvas = backgroundCanvasRef.current;
    const backgroundContext = backgroundCanvas.getContext('2d');

    const scratchCardImage = new Image();

    scratchCardImage.onload = function () {
      scratchCardContext.drawImage(this, 0, 0);
      scratchCardContext.globalCompositeOperation = 'destination-out';
      scratchCardContext.lineWidth = strokeWidth;
      backgroundImage.src = win6;
    };

    const backgroundImage = new Image();
    backgroundImage.onload = function () {
      backgroundContext.drawImage(this, 0, 0);
    };
    scratchCardImage.src = scratchCardImageSrc;
  }, []);

  // 초기 정보 세팅
  useEffect(() => {
    lottoAPI
      .getLottoInfo({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setRemainingCount(
            gameInfo.LOTTO_MAX_PLAYTIME - data.data.lottoPerDay
          );
          setTodayResult(data.data.todayResult);
        }
      });

    lottoAPI
      .checkLottoCount({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setOverCountCheck(data.data);
        }
      });
  }, [member]);

  //복권 뽑기 버튼 누를시
  const backEnd = () => {
    //이미지 변경
    const backgroundCanvas = backgroundCanvasRef.current;
    const backgroundContext = backgroundCanvas.getContext('2d');
    const backgroundImage = new Image();

    backgroundImage.onload = function () {
      backgroundContext.drawImage(this, 0, 0);
    };

    //로그인 안되어있을 경우
    if (member.token === '') {
      alertLoginModalRef.current.open();
      return;
    }
    //포인트 부족할 경우
    if (member.memberInfo.point < gameInfo.ROULETTE_FEE) {
      alertPointLackModalRef.current.open();
      return;
    }

    //게임시작
    //횟수가 1번을 안넘어갔을 경우
    if (!overCountCheck) {
      setIsPop(true);

      lottoAPI.playLotto({ token: member.token }).then((data) => {
        if (data.success) {
          setRank(data.data.lottoPointIdx);

          switch (data.data.lottoPointIdx) {
            case 1:
              backgroundImage.src = win1;
              setPoint(gameInfo.FIRST_POINT);
              break;
            case 2:
              backgroundImage.src = win2;
              setPoint(gameInfo.SECOND_POINT);
              break;
            case 3:
              backgroundImage.src = win3;
              setPoint(gameInfo.THIRD_POINT);
              break;
            case 4:
              backgroundImage.src = win4;
              setPoint(gameInfo.FOURTH_POINT);
              break;
            case 5:
              backgroundImage.src = win5;
              setPoint(gameInfo.FIFTH_POINT);
              break;
            case 6:
              backgroundImage.src = win6;
              setPoint(gameInfo.LAST_POINT);
              break;
          }
        }
      });
      setMemberPoint((tmp) => tmp - 1000);

      //오늘 결과 1000원 마이너스
      lottoAPI
        .getLottoInfo({
          token: member.token,
        })
        .then((data) => {
          setTodayResult((prev) => prev - 1000);
        });
    } else {
      setIsPop(false);
      alertCountModalRef.current.open();
    }
  };

  //스크래치 기능 관련 코드
  const scratchStart = ({ nativeEvent }) => {
    if (isPop) {
      const { layerX, layerY } = nativeEvent;

      setIsDrawing(true);
      setStartX(layerX);
      setStartY(layerY);
    } else {
      alertBuyFirstModalRef.current.open();
    }
  };

  const getFilledInPixels = (stride) => {
    const context = scratchCardCanvasRef.current.getContext('2d');
    if (!stride || stride < 1) stride = 1;
    const pixels = context.getImageData(0, 0, width, height);
    const total = pixels.data.length / stride;
    let count = 0;
    for (let i = 0; i < pixels.data.length; i += stride) {
      if (parseInt(pixels.data[i], 10) === 0) count++;
    }
    return Math.round((count / total) * 100);
  };

  const scratch = ({ nativeEvent }) => {
    const { layerX, layerY } = nativeEvent;
    const context = scratchCardCanvasRef.current.getContext('2d');

    if (!isDrawing) {
      return;
    }

    context.globalCompositeOperation = 'destination-out';

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(layerX, layerY);
    context.closePath();
    context.stroke();

    setStartX(layerX);
    setStartY(layerY);

    const percent = getFilledInPixels(32);
    onProgress(percent);

    // 스크래치 70%이상 긁었을때, 포인트 변동 + 오늘결과 보여주기
    if (percent >= completedAt && !isCompleted) {
      setIsCompleted(true);
      alertShowResultModalRef.current.open();
      scratchEnd();

      //보유포인트, 잔여횟수 업데이트 됨(useState)
      memberAPI
        .getMember({
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
            setMemberPoint(data.data.point);
            const token = member.token;
            const memberInfo = data.data;
            updateInfo({ token, memberInfo });
          }
        });
    }
  };

  const scratchEnd = () => {
    setIsDrawing(false);
  };

  const onProgress = (percent) => {
    setProgress(percent);
  };

  const infos = [
    {
      subtitle: '보유 포인트',
      content: memberPoint,
    },
    {
      subtitle: '참가 포인트',
      content: gameInfo.LOTTO_FEE,
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
    <div className="relative md:w-3/5 lg:w-3/5 w-full space-y-4 p-3 mb-10 flex flex-col text-center items-center justify-center bg-gradient-radial from-gray-700 to-gray-900 rounded-md border-[16px] border-mainBlack dark:from-pink-300 dark:via-purple-300 dark:to-indigo-400">
      <div className="grid grid-cols-2 gap-3 order-first sm:order-none sm:inset-y-5 sm:right-5 py-2 sm:py-3 pl-5 sm:px-5 lg:p-5 w-full h-fit bg-gray-900 rounded-md shadow-md text-amber-200 text-xs sm:text-base">
        {infos.map((info) => (
          <div
            key={info.subtitle}
            className="items-center flex justify-between mx-2"
          >
            <div className="sm:flex-shrink-0">
              <div>{info.subtitle}</div>
            </div>
            <div className="min-w-[64px] w-auto text-right px-2 tabular-nums bg-gray-300 bg-opacity-10 rounded-md">
              {info.content}
            </div>
          </div>
        ))}
      </div>
      <div className="inset-y-5 py-2 pl-5  w-full   bg-gray-900 rounded-md shadow-md text-amber-200 ">
        <p className="text-lg">
          {isPop
            ? `${progress}% (${completedAt}%이상 긁어야 합니다)`
            : '복권을 뽑아주세요'}
        </p>
      </div>

      <div className="relative flex justify-start">
        <div>
          <canvas
            className="w-full h-full pl-2 pr-2"
            ref={backgroundCanvasRef}
            width={width}
            height={height}
          />
        </div>

        <div className="absolute w-full h-full">
          <canvas
            className="w-full h-full pl-2 pr-2"
            ref={scratchCardCanvasRef}
            width={width}
            height={height}
            onMouseDown={scratchStart}
            onMouseMove={scratch}
            onMouseUp={scratchEnd}
            onTouchStart={scratchStart}
            onTouchMove={scratch}
            onTouchEnd={scratchEnd}
          />
        </div>
      </div>
      <button
        disabled={isPop}
        onClick={backEnd}
        className={` relative  sm:w-[350px] w-full
          flex justify-center px-2 py-2  
         text-2xl 
          rounded-lg text-white font-bold
         
          ${
            !isPop
              ? 'bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-darkComponent'
              : 'bg-divisionGray dark:bg-mainBlack dark:text-gray-400'
          }`}
      >
        뽑기
      </button>
      <MessageModal ref={alertShowResultModalRef}>
        {rank}등 입니다! {point.toLocaleString('ko-KR')}point를 획득하셨습니다.
      </MessageModal>
      <MessageModal ref={alertCountModalRef}>
        로또는 하루 1회만 참여 가능합니다.
      </MessageModal>
      <MessageModal ref={alertLoginModalRef}>
        로그인 후 이용해주십시오.
      </MessageModal>
      <MessageModal ref={alertPointLackModalRef}>
        포인트가 부족합니다.
      </MessageModal>
      <MessageModal ref={alertBuyFirstModalRef}>
        복권을 먼저 뽑으세요!
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

export default connect(mapStateToProps, mapDispatchToProps)(Lotto);
