import React from 'react';
import './dice.css';
import { useState } from 'react';

//img
import one from '../img/dice/dice_one.png';
import two from '../img/dice/dice_two.png';
import three from '../img/dice/dice_three.png';
import four from '../img/dice/dice_four.png';
import five from '../img/dice/dice_five.png';
import six from '../img/dice/dice_six.png';
import win from '../img/dice/result_win.png';
import lose from '../img/dice/result_lose.png';
import draw from '../img/dice/result_draw.png';

// audio
import rollDiceA from '../sound/roll.wav';
import winA from '../sound/win.mp3';
import equalA from '../sound/equal.mp3';
import loseA from '../sound/lose.mp3';

var rollNum = 0;
var scoreFlag = 1;

const DiceGame = () => {
  const [fixed, setFixed] = useState(false);
  const [betting, setBet] = useState(0);
  const [score, setScore] = useState(0);
  const onChange = (event) => setBet(event.target.value);
  const [confirm, setConfirm] = useState(true);

  const refresh = () => {
    window.location.reload();
  };

  function toggleClasses(die) {
    die.classList.toggle('odd-roll');
    die.classList.toggle('even-roll');
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function fixDice(e) {
    if (rollNum > 0) {
      e.target.parentNode.dataset.fix = 'true';
      if (e.target.parentNode.hasChildNodes()) {
        var children = e.target.parentNode.getElementsByTagName('LI');
        for (var i = 0; i < children.length; i++) {
          children[i].style.backgroundColor = 'black';
        }
      }
    }
  }

  function rollDiceOnClick() {
    if (rollNum < 3 && scoreFlag === 1) {
      new Audio(rollDiceA).play();
      rollNum++;
      const dice = [...document.querySelectorAll('.die-list')];
      dice.forEach((die) => {
        if (die.dataset.fix !== 'true') {
          toggleClasses(die);
          die.dataset.roll = getRandomNumber(1, 6);
        }
      });
      var user = [];
      dice.forEach((die) => {
        user.push(die.dataset.roll * 1);
      });
      setScore(calculate(user));
    }
    if (rollNum > 2) {
      document.getElementById('rollDice').style.backgroundColor =
        'rgb(255,80,80)';
      document.getElementById('rollDice').style.color = 'rgb(80,80,80)';
      document.getElementById('chooseDice').style.backgroundColor =
        'rgb(80,255,80)';
      document.getElementById('rollDice').style.color = 'rgb(255,255,255)';
    }
  }
  function result() {
    if (scoreFlag === 1 && rollNum > 0) {
      scoreFlag = 0;
      var user = [];
      const dice = [...document.querySelectorAll('.die-list')];
      dice.forEach((die) => {
        user.push(die.dataset.roll * 1);
      });
      var computer = [];
      var cValue = 0;
      for (var i = 0; i < 3; i++) {
        var some = [];
        for (var j = 0; j < 5; j++) {
          some.push(getRandomNumber(1, 6));
        }
        var sValue = calculate(some);
        if (cValue < sValue) {
          computer = some;
          cValue = sValue;
        }
      }
      var userScore = calculate(user);
      Computer(computer);
      if (userScore > cValue) {
        new Audio(winA).play();
        resultImg(1);
      } else if (userScore === cValue) {
        new Audio(equalA).play();
        resultImg(0);
      } else {
        new Audio(loseA).play();
        resultImg(-1);
      }
      setFixed(true);
    }
  }

  function calculate(items) {
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    var score = 0;
    items.forEach((item) => {
      score += item;
    });
    score += poker(items);
    score += fullHouse(items);
    score += small(items);
    score += large(items);
    score += yacht(items);
    return score;
  }

  function poker(items) {
    // 4개의 주사위 눈이 같다면 10점 추가
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    if (
      items[0] === items[1] &&
      items[1] === items[2] &&
      items[2] === items[3] &&
      items[3] !== items[4]
    )
      return 10;
    else if (
      items[0] !== items[1] &&
      items[1] === items[2] &&
      items[2] === items[3] &&
      items[3] === items[4]
    )
      return 10;
    else return 0;
  }

  function fullHouse(items) {
    // 3개의 주사위 눈과 2개의 주사위 눈 모두 같다면 15점 추가
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    if (
      items[0] === items[1] &&
      items[1] !== items[2] &&
      items[2] === items[3] &&
      items[3] === items[4]
    )
      return 15;
    else if (
      items[0] === items[1] &&
      items[1] === items[2] &&
      items[2] !== items[3] &&
      items[3] === items[4]
    )
      return 15;
    else return 0;
  }

  function small(items) {
    // 4개의 주사위가 순서대로 있는 경우 20점 추가
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    if (
      items[0] === items[1] - 1 &&
      items[1] === items[2] - 1 &&
      items[2] === items[3] - 1 &&
      items[3] !== items[4] - 1
    )
      return 20;
    if (
      items[0] !== items[1] - 1 &&
      items[1] === items[2] - 1 &&
      items[2] === items[3] - 1 &&
      items[3] === items[4] - 1
    )
      return 20;
    else return 0;
  }

  function large(items) {
    // 5개의 주사위가 순서대로 있는 경우 25점 추가
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    var ui = items.filter((c, index) => {
      return items.indexOf(c) === index;
    });
    if (ui.length === 5 && ui[0] === 1 && ui[4] === 5) return 25;
    else if (ui.length === 5 && ui[0] === 2 && ui[4] === 6) return 25;
    else return 0;
  }

  function yacht(items) {
    // 5개의 숫자가 모두 같은 경우 30점 추가
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    var ui = items.filter((c, index) => {
      return items.indexOf(c) === index;
    });
    if (ui.length === 1) return 30;
    else return 0;
  }

  function resultImg(tmp) {
    var screen = document.getElementById('result_img');
    if (tmp === 1) {
      var img_win = document.createElement('img');
      img_win.src = win;
      screen.appendChild(img_win);
    } else if (tmp === 0) {
      var img_draw = document.createElement('img');
      img_draw.src = draw;
      screen.appendChild(img_draw);
    } else if (tmp === -1) {
      var img_lose = document.createElement('img');
      img_lose.src = lose;
      screen.appendChild(img_lose);
    }
  }

  function Computer(items) {
    items.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
    var screenTotal = document.getElementById('com_result');
    var screen = document.createElement('div');
    screen.className = 'h-10 mb-2 flex';
    var i = 0;
    for (; i < items.length; i++) {
      if (items[i] === 1) {
        var tmp1 = document.createElement('img');
        tmp1.src = one;
        tmp1.className = 'w-8 mr-1';
        screen.appendChild(tmp1);
      } else if (items[i] === 2) {
        var tmp2 = document.createElement('img');
        tmp2.src = two;
        tmp2.className = 'w-8 mr-1';
        screen.appendChild(tmp2);
      } else if (items[i] === 3) {
        var tmp3 = document.createElement('img');
        tmp3.src = three;
        tmp3.className = 'w-8 mr-1';
        screen.appendChild(tmp3);
      } else if (items[i] === 4) {
        var tmp4 = document.createElement('img');
        tmp4.src = four;
        tmp4.className = 'w-8 mr-1';
        screen.appendChild(tmp4);
      } else if (items[i] === 5) {
        var tmp5 = document.createElement('img');
        tmp5.src = five;
        tmp5.className = 'w-8 mr-1';
        screen.appendChild(tmp5);
      } else {
        var tmp6 = document.createElement('img');
        tmp6.src = six;
        tmp6.className = 'w-8 mr-1';
        screen.appendChild(tmp6);
      }
    }
    var tmp = document.createElement('div');
    tmp.innerHTML = calculate(items);
    screen.appendChild(tmp);
    screenTotal.appendChild(screen);
  }

  return (
    <div className="md:w-3/5 lg:w-3/5 w-full mb-10 flex flex-wrap items-end bg-gradient-radial from-red-600 to-red-900  rounded-md border-[16px] border-[ridge] border-mainBlack dark:border-[#CA8600]">
      {/* <div className="w-full border-2 border-divisionGray">
        보유 포인트 : 
        배팅 포인트 : 
        잔여 횟수 : ?/6
      </div> */}
      <div className="sm:w-2/3 w-full items-center flex-initial">
        <div className="dice">
          <ol
            className="die-list odd-roll shadow-lg"
            data-roll="1"
            id="die-1"
            onClick={fixDice}
            data-fix="false"
          >
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
          <ol
            className="die-list even-roll shadow-lg"
            data-roll="1"
            id="die-2"
            onClick={fixDice}
            data-fix="false"
          >
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
          <ol
            className="die-list even-roll shadow-lg"
            data-roll="1"
            onClick={fixDice}
            id="die-3"
            data-fix="false"
          >
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
        </div>
        <div className="dice  flex flex-row">
          <ol
            className="die-list odd-roll shadow-lg"
            data-roll="1"
            id="die-4"
            onClick={fixDice}
            data-fix="false"
          >
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
          <ol
            className="die-list even-roll shadow-lg"
            data-roll="1"
            id="die-5"
            onClick={fixDice}
            data-fix="false"
          >
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
        </div>
        <div id="buttonDiv">
          <button
            id="rollDice"
            onClick={rollDiceOnClick}
            className="ml-3 mr-5 mt-10 mb-3 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded dark:bg-divisionGray dark:text-mainBlack dark:hover:bg-slate-400"
          >
            start
          </button>
          <button
            id="chooseDice"
            onClick={result}
            className="mt-10 mb-3 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded dark:bg-divisionGray dark:text-mainBlack dark:hover:bg-slate-400"
          >
            확정
          </button>
          {fixed ? (
            <button
              id="chooseDice"
              onClick={refresh}
              className="mx-5 mt-10 mb-3 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded dark:bg-divisionGray dark:text-mainBlack dark:hover:bg-slate-400"
            >
              reset
            </button>
          ) : null}
        </div>
      </div>
      <div className="sm:w-1/3 w-full ">
        <div id="result_img"></div>
        <div id="com_result"></div>
        <div className="h-fit bg-white/20 rounded-md border-2 border-white ">
          <div className="p-2 flex flex-col justify-center ">
            <div className="flex justify-between my-1">
              <strong className="big text-slate-200">현재 포인트 :</strong>
              <div className="text-yellow-500">10000000</div>
            </div>
            <div className="flex justify-between my-1">
              <strong className="big text-slate-200">배팅 포인트 :</strong>
              {confirm ? (
                <input
                  id="point"
                  value={betting}
                  className="big border-2 border-divisionGray rounded-md text-yellow-500"
                  onChange={onChange}
                  style={{ width: '6vw', textAlign: 'right' }}
                ></input>
              ) : (
                <div className="text-yellow-500">{betting}</div>
              )}
            </div>
            <div className="flex justify-between my-1">
              <strong className="big text-slate-200">점수 :</strong>
              <div className="big text-yellow-500">{score}</div>
            </div>
            <div className="flex justify-between my-1">
              <strong className="big text-slate-200">오늘 한 횟수 :</strong>
              <div className="big text-yellow-500">1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RuleOfDice = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-4/5 my-5 p-5 border-2 shadow-lg border-divisionGray rounded-md dark:border-pointYellow">
        게임 규칙
        <br />
        총 3번 주사위를 굴릴 수 있습니다.
        <br />
        주사위의 눈을 클릭하면 확정 할 수 있습니다.
        <br />
        <br />
        매일 6번까지 구매 가능합니다.
        <br />
        start 버튼을 눌려 주사위를 굴립니다.
        <br />
        수령을 클릭하면 당첨 포인트가 수령됩니다.
      </div>
    </div>
  );
};

export { DiceGame, RuleOfDice };
