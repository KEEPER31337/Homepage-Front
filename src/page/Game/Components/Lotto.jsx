import React from 'react';
import '../lotto.css';
import { useState, useRef, useEffect } from 'react';
import scratchCardImageSrc from '../img/Lotto/scratchCard.png';
import win1 from '../img/Lotto/win1.png';
import win2 from '../img/Lotto/win2.png';
import win3 from '../img/Lotto/win3.png';
import win4 from '../img/Lotto/win4.png';
import win5 from '../img/Lotto/win5.png';
import win6 from '../img/Lotto/win6.png';

// local
import lottoAPI from 'API/v1/game';
import { connect } from 'react-redux';
import MessageModal from 'shared/MessageModal';

const width = 350;
const height = 500;
const strokeWidth = 130; //브러쉬 굵기
const completedAt = 70; //70% 이상 긁어야함

const Lotto = ({ member, gameInfo }) => {
  // ref
  const backgroundCanvasRef = useRef(null);
  const scratchCardCanvasRef = useRef(null);
  const rankModalRef = useRef({});

  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPop, setIsPop] = useState(false);

  //게임 후, 등수와 포인트 띄워줌
  const [rank, setRank] = useState(0);
  const [point, setPoint] = useState(0);

  // 게임 상에서 띄워줄 정보
  const [memberPoint, setMemberPoint] = useState(member.memberInfo.point);
  const [remainingCount, setRemainingCount] = useState(3);

  const [completed, setCompleted] = useState(false);
  //완료했는지 안했는지 bool값으로
  const [progress, setProgress] = useState(0);
  //진행 과정 몇 %인지
  const [isCompleted, setIsCompleted] = useState(false);
  //alert창 한번만 띄우기 위해서

  const onCompleted = () => {
    setCompleted(true);
  };
  const onProgress = (percent) => {
    setProgress(percent);
  };

  const backEnd = () => {
    //이미지 변경
    const backgroundCanvas = backgroundCanvasRef.current;
    const backgroundContext = backgroundCanvas.getContext('2d');

    const backgroundImage = new Image();

    backgroundImage.onload = function () {
      backgroundContext.drawImage(this, 0, 0);
    };

    //횟수제한
    lottoAPI.checkLottoCount({ token: member.token }).then((data) => {
      console.log('b', data.data);

      //false일경우 == 횟수가 1번을 안넘어갔음,
      if (!data.data) {
        //나중에 ! 추가해라..
        setIsPop(true);
        //NOTE api 로또 게임 횟수 제한에서, 하루에 1번만 실행되도록 하는데,
        // 실행해보니, 게임을 총 2번 할 수 있는 것 같습니다
        //

        lottoAPI.playLotto({ token: member.token }).then((data) => {
          console.log('등수는 : ', data.data.lottoPointIdx);

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
        });
      } else {
        setIsPop(false);
        alert('오늘은 마감이오! 이미 1회 다했디~');
        //하루 1번만 가능합니다1
      }
    });
  };

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

    lottoAPI.getLottoInfo({ token: member.token }).then((data) => {
      console.log('몇회 했냐 : ', data.data);
    });
  }, []);

  const scratchStart = ({ nativeEvent }) => {
    if (isPop) {
      const { layerX, layerY } = nativeEvent;

      setIsDrawing(true);
      setStartX(layerX);
      setStartY(layerY);
    } else {
      alert('복권을 먼저 뽑으세요!');
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
    //
    if (percent >= completedAt && !isCompleted) {
      setIsCompleted(true);
      onCompleted();
      //setIsPop(false);
      // alert(rank + ' 등 축하합니다!');
      rankModalRef.current.open();
    }
  };

  const scratchEnd = () => {
    setIsDrawing(false);
  };
  return (
    <div className="relative md:w-3/5 lg:w-3/5 w-full space-y-4 pb-10 sm:p-10 mb-10 flex flex-col text-center items-center justify-center bg-gradient-radial from-gray-700 to-gray-900 rounded-md border-[16px] border-mainBlack dark:border-divisionGray">
      <div className="inset-y-5 py-2 pl-5  w-full   bg-gray-900 rounded-md shadow-md text-amber-200 text-xs sm:text-base">
        <p>
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
              ? 'bg-gradient-to-r from-amber-400 via-red-800 to-black hover:bg-pointYellow'
              : 'bg-divisionGray dark:bg-darkPoint'
          }`}
      >
        뽑기
      </button>
      <MessageModal ref={rankModalRef}>
        {rank}등 입니다! {point.toLocaleString('ko-KR')}point를 획득하셨습니다.
      </MessageModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Lotto);
