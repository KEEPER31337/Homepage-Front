import React from 'react';
import './dice.css';
import { useState } from 'react';

var rollNum = 0;
var socreFlag = 1;

const DiceGame = () => {
  const [fixed, setFixed] = useState(false);

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
    if (rollNum < 3 && socreFlag == 1) {
      console.log('flag : ', socreFlag, ' rollNum : ', rollNum);
      rollNum++;
      const dice = [...document.querySelectorAll('.die-list')];
      dice.forEach((die) => {
        if (die.dataset.fix != 'true') {
          toggleClasses(die);
          die.dataset.roll = getRandomNumber(1, 6);
        }
      });
    }
    if (rollNum > 2) {
      document.getElementById('rollDice').disabled;
      document.getElementById('rollDice').style.backgroundColor =
        'rgb(255,80,80)';
      document.getElementById('rollDice').style.color = 'rgb(80,80,80)';
      document.getElementById('chooseDice').style.backgroundColor =
        'rgb(80,255,80)';
      document.getElementById('rollDice').style.color = 'rgb(255,255,255)';
    }
  }
  function result() {
    if (socreFlag == 1 && rollNum > 0) {
      socreFlag = 0;
      console.log('scoreFlag : ', socreFlag, ' rollNum : ', rollNum);
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
      console.log('user : ', userScore);
      console.log('computer : ', cValue);
      computer.forEach((item) => {
        console.log(item);
      });
      if (userScore > cValue) alert('축축!');
      else if (userScore == cValue) alert('동점..ㅋ');
      else alert('ㅋ');
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
      items[0] == items[1] &&
      items[1] == items[2] &&
      items[2] == items[3] &&
      items[3] != items[4]
    )
      return 10;
    else if (
      items[0] != items[1] &&
      items[1] == items[2] &&
      items[2] == items[3] &&
      items[3] == items[4]
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
      items[0] == items[1] &&
      items[1] != items[2] &&
      items[2] == items[3] &&
      items[3] == items[4]
    )
      return 15;
    else if (
      items[0] == items[1] &&
      items[1] == items[2] &&
      items[2] != items[3] &&
      items[3] == items[4]
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
      items[0] == items[1] - 1 &&
      items[1] == items[2] - 1 &&
      items[2] == items[3] - 1 &&
      items[3] != items[4] - 1
    )
      return 20;
    if (
      items[0] != items[1] - 1 &&
      items[1] == items[2] - 1 &&
      items[2] == items[3] - 1 &&
      items[3] == items[4] - 1
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
    if (ui.length == 5 && ui[0] == 1 && ui[4] == 5) return 25;
    else if (ui.length == 5 && ui[0] == 2 && ui[4] == 6) return 25;
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
    if (ui.length == 1) return 30;
    else return 0;
  }

  return (
    <div className="bg-divisionGray h-full w-1/2 items-center m-10">
      <div className="dice">
        <ol
          className="die-list odd-roll"
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
          className="die-list even-roll"
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
      </div>
      <div className="dice">
        <ol
          className="die-list even-roll"
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
        <ol
          className="die-list odd-roll"
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
          className="die-list even-roll"
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
          className="mx-3 my-10 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"
        >
          start
        </button>
        <button
          id="chooseDice"
          onClick={result}
          className="mx-3 my-10 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"
        >
          확정
        </button>
        {fixed ? (
          <button
            id="chooseDice"
            onClick={refresh}
            className="mx-3 my-10 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"
          >
            reset
          </button>
        ) : null}
      </div>
    </div>
  );
};

const RuleOfDice = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 my-5 p-5 border-2 border-divisionGray">
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

const Information = () => {
  const [betting, setBet] = useState(0);
  const onChange = (event) => setBet(event.target.value);
  const [confirm, setConfirm] = useState(true);
  const onClick = () => {
    if (0 < betting && betting <= 10000) setConfirm(false);
  };
  return (
    <div className="h-1/5 w-1/4 p-2 flex flex-col justify-center">
      <div className="big">
        현재 포인트 : 1000??????
        <br />
      </div>
      <div>
        걸 포인트 :{' '}
        {confirm ? (
          <input
            id="point"
            value={betting}
            onChange={onChange}
            style={{ width: '6vw', textAlign: 'right' }}
          ></input>
        ) : (
          betting
        )}
        <br />
      </div>
      <div>점수 : </div>
      <div>오늘 한 횟수 : ???</div>
      <button
        id="chooseDice"
        onClick={onClick}
        className="mx-3 my-10 bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded"
      >
        확정!!
      </button>
    </div>
  );
};

export { DiceGame, RuleOfDice, Information };
