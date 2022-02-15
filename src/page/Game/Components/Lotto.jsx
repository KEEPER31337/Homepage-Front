import React from 'react';
import '../lotto.css';
import { useState, useRef, useEffect } from 'react';
import scratchCardImageSrc from '../img/Lotto/scratchCard.png';
import backgroundImageSrc from '../img/Lotto/backGround.png';
import win1 from '../img/Lotto/win1.png';
import win2 from '../img/Lotto/win2.png';
import win3 from '../img/Lotto/win3.png';

const width = 700;
const height = 400;
const strokeWidth = 150; //브러쉬 굵기
const completedAt = 20; //20% 이상 긁어야함

const Lotto = ({ gameInfo }) => {
  const backgroundCanvasRef = useRef(null);
  const scratchCardCanvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isPop, setIsPop] = useState(false);
  const [rank, setRank] = useState(0);

  const [win, setWin] = useState('');
  //win 이미지 url 저장

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
    //output : rank

    const randomNum = Math.floor(Math.random() * 3 + 1);
    setRank(randomNum);
    //일단 랜덤으로 아무 값(1~3) 가져옴

    setIsPop(true);
    //setCompleted(false);
    //setProgress(0)
    //console.log(isPop)
    switch (rank) {
      case 0:
        setWin(win1);
        break;
      case 1:
        setWin(win2);
        break;
      case 2:
        setWin(win3);
        break;
    }
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
      backgroundImage.src = backgroundImageSrc;
    };

    const backgroundImage = new Image();
    backgroundImage.onload = function () {
      backgroundContext.drawImage(this, 0, 0);
    };
    scratchCardImage.src = scratchCardImageSrc;
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
      alert(rank + ' 등 축하합니다!');
    }
  };

  const scratchEnd = () => {
    setIsDrawing(false);
  };
  return (
    <div className="relative w-3/5 space-y-4 pb-10 sm:p-10 mb-10 flex flex-wrap justify-center sm:justify-start bg-gradient-radial from-gray-700 to-gray-900 rounded-md border-[16px] border-mainBlack dark:border-divisionGray">
      <div className="inset-y-5 py-2 pl-5  w-full   bg-gray-900 rounded-md shadow-md text-amber-200 text-xs sm:text-base">
        <p>
          성공여부: {completed ? 'Yes' : 'No'}
          <br />
          진행상황: {progress}% ({completedAt}%이상 넘어야 합니다)
        </p>
      </div>

      <div
        className="relative w-full
        flex justify-center z-10"
      >
        <canvas
          id="scratch-canvas"
          className=" w-full h-full"
          ref={backgroundCanvasRef}
          width={width}
          height={height}
        />
        <div className=" absolute w-10/12  bottom-4 h-3/5 z-30">
          <canvas
            ref={scratchCardCanvasRef}
            id="canvas"
            className=" w-full h-full"
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
        <div
          className="absolute w-10/12  bottom-4 h-3/5
             z-20"
        >
          <img className=" w-full h-full" src={win}></img>
        </div>
      </div>

      <button
        disabled={isPop}
        onClick={backEnd}
        className={` relative w-full 
          flex justify-center px-4 py-4 border 
          border-transparent text-sm font-bold
          rounded-lg text-white 
         
          ${
            !isPop
              ? 'bg-mainYellow hover:bg-pointYellow'
              : 'bg-divisionGray dark:bg-darkPoint'
          }`}
      >
        복권 뽑기
      </button>
    </div>
  );
};

const RuleOfLotto = ({ gameInfo }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-2/5 my-5 p-5 border-2 border-divisionGray">
        <div className="flex  border-b bg-white  rounded-lg">
          <table className="relative w-full divide-y divide-gray-200">
            <tr key="1">
              <td className="px- py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <span className=" px-2 py-1 leading-5 text-sm font-bold rounded-full bg-amber-100 text-amber-600">
                      1등
                    </span>

                    <div className="text-lg text-gray-500">
                      {gameInfo.FIRST_POINT}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {gameInfo.FIRST_PROB}%
                </span>
              </td>
            </tr>
            <tr key="1">
              <td className="px- py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <span className=" px-2 py-1 leading-5 text-sm font-bold rounded-full bg-amber-100 text-amber-600">
                      2등
                    </span>

                    <div className="text-lg text-gray-500">
                      {gameInfo.SECOND_POINT}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {gameInfo.SECOND_PROB}%
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export { Lotto, RuleOfLotto };
