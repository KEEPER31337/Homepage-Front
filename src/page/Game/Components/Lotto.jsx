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
const strokeWidth = 100; //브러쉬 굵기
const completedAt = 20; //20% 이상 긁어야함

const Lotto = () => {
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
    <div className="bg-divisionGray h-full w-1/2 items-center m-10">
      Lotto 게임 화면! 여기다가 만들면 됩니당!
      <div>
        <p>
          성공여부: {completed ? 'Yes' : 'No'}
          <br />
          진행상황: {progress}% ({completedAt}%이상 넘어야 합니다)
        </p>
        <button
          disabled={isPop}
          onClick={backEnd}
          className={`group relative w-full 
          flex justify-center px-4 py-4 border 
          border-transparent text-lg font-bold
          rounded-lg text-white 
         
          ${
            !isPop
              ? 'bg-mainYellow hover:bg-pointYellow'
              : 'bg-divisionGray dark:bg-darkPoint'
          }`}
        >
          복권 뽑기
        </button>

        <div class="lotto_container">
          <canvas
            id="scratch-canvas"
            className="group relative w-full 
            flex justify-center z-10"
            ref={backgroundCanvasRef}
            width={width}
            height={height}
          />
          <canvas
            className="group absolute w-full 
            flex justify-center top-6 left-6   z-30"
            ref={scratchCardCanvasRef}
            id="canvas"
            width={width}
            height={height}
            onMouseDown={scratchStart}
            onMouseMove={scratch}
            onMouseUp={scratchEnd}
            onTouchStart={scratchStart}
            onTouchMove={scratch}
            onTouchEnd={scratchEnd}
          />

          <div
            className="group absolute w-full 
            flex justify-center top-6 left-6 z-20"
          >
            <img src={win}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

const RuleOfLotto = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 my-5 p-5 border-2 border-divisionGray">
        게임 규칙
        <br />
        적어주시면 됩니당!
      </div>
    </div>
  );
};

export { Lotto, RuleOfLotto };
