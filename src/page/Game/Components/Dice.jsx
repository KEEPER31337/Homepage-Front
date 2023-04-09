import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// local
import MessageModal from 'shared/MessageModal';
import actionMember from 'redux/action/member';

// img
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

// API
import diceAPI from 'API/v1/game';
import memberAPI from 'API/v1/member';

// style
import './dice.css';

var rollNum = 0;
var scoreFlag = 1;

const DICE_GAME_WIN = 1;
const DICE_GAME_DRAW = 0;
const DICE_GAME_LOSE = -1;
const MAX_PLAY_DICE = 6;

const DiceGame = ({ gameInfo, member, updateInfo }) => {
  const [fixed, setFixed] = useState(false); // 게임 결과 놨는지 확인 + reset 버튼 보여줄지 말지 정함
  const [betting, setBet] = useState(0); // 배팅 포인트 저장
  const [score, setScore] = useState(0); // user의 주사위 게임 점수 저장
  const [confirm, setConfirm] = useState(true); // 배팅 포인트 확정
  const [count, setCount] = useState(0); // 하루 주사위 한 횟수 저장
  const [check, setCheck] = useState(false); // 하루 제한된 횟수만큼 했는지 확인
  const [memberPoint, setMemberPoint] = useState(member.memberInfo.point);
  const [firstCheck, setFirstCheck] = useState(true);
  const alertBettingPointModalRef = useRef({});
  const alertCountModalRef = useRef({});
  const alertLoginModalRef = useRef({});
  const alertPointLackModalRef = useRef({});

  const onChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setBet(event.target.value);
    }
  };

  useEffect(() => {
    diceAPI
      .getDiceInfo({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setCount(data.data);
        }
      });

    diceAPI
      .checkDiceCount({
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setCheck(data.data);
        }
      });
  }, [member]);

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
    if (member.token === '') {
      alertLoginModalRef.current.open();
      return;
    }
    if (firstCheck && member.memberInfo.point < betting) {
      alertPointLackModalRef.current.open();
      return;
    }
    if (firstCheck && check) {
      alertCountModalRef.current.open();
      return;
    }
    if (!(0 < betting && betting <= gameInfo.DICE_BET_MAX)) {
      alertBettingPointModalRef.current.open();
      return;
    }
    if (firstCheck) {
      setConfirm((tmp) => !tmp);
      diceAPI
        .playDice({
          bet: betting,
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
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
        });
    }

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

    setFirstCheck(false);
  }
  function result() {
    if (scoreFlag === 1 && rollNum > 0 && !fixed) {
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
        diceAPI
          .setDiceResult({
            bet: betting,
            result: DICE_GAME_WIN,
            token: member.token,
          })
          .then((data) => {
            if (data.success) {
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
          });
        resultImg(DICE_GAME_WIN);
      } else if (userScore === cValue) {
        new Audio(equalA).play();
        diceAPI
          .setDiceResult({
            bet: betting,
            result: DICE_GAME_DRAW,
            token: member.token,
          })
          .then((data) => {
            if (data.success) {
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
          });
        resultImg(DICE_GAME_DRAW);
      } else {
        new Audio(loseA).play();
        diceAPI
          .setDiceResult({
            bet: betting,
            result: DICE_GAME_LOSE,
            token: member.token,
          })
          .then((data) => {
            if (data.success) {
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
          });
        resultImg(DICE_GAME_LOSE);
      }
      setFixed(true);
    }
  }

  function calculate(items) {
    items.sort();
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
    items.sort();
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
    items.sort();
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
    items.sort();
    var ui = items.filter((c, index) => {
      return items.indexOf(c) === index;
    });
    if (ui.length === 4) {
      if (ui[0] === ui[1] - 1 && ui[1] === ui[2] - 1 && ui[2] === ui[3] - 1)
        return 20;
      else return 0;
    }
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
    items.sort();
    var ui = items.filter((c, index) => {
      return items.indexOf(c) === index;
    });
    if (ui.length === 5 && ui[0] === 1 && ui[4] === 5) return 25;
    else if (ui.length === 5 && ui[0] === 2 && ui[4] === 6) return 25;
    else return 0;
  }

  function yacht(items) {
    // 5개의 숫자가 모두 같은 경우 30점 추가
    items.sort();
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
    items.sort();
    var screenTotal = document.getElementById('com_result');
    var screen = document.createElement('div');
    screen.className = 'h-10 mb-2 flex md:flex-wrap';
    var i = 0;
    for (; i < items.length; i++) {
      if (items[i] === 1) {
        var tmp1 = document.createElement('img');
        tmp1.src = one;
        tmp1.className = 'w-[15%] h-fit max-h-[40px] max-w-[40px] mr-1';
        screen.appendChild(tmp1);
      } else if (items[i] === 2) {
        var tmp2 = document.createElement('img');
        tmp2.src = two;
        tmp2.className = 'w-[15%] h-fit max-h-[40px] max-w-[40px] mr-1';
        screen.appendChild(tmp2);
      } else if (items[i] === 3) {
        var tmp3 = document.createElement('img');
        tmp3.src = three;
        tmp3.className = 'w-[15%] h-fit max-h-[40px] max-w-[40px] mr-1';
        screen.appendChild(tmp3);
      } else if (items[i] === 4) {
        var tmp4 = document.createElement('img');
        tmp4.src = four;
        tmp4.className = 'w-[15%] h-fit max-h-[40px] max-w-[40px] mr-1';
        screen.appendChild(tmp4);
      } else if (items[i] === 5) {
        var tmp5 = document.createElement('img');
        tmp5.src = five;
        tmp5.className = 'w-[15%] h-fit max-h-[40px] max-w-[40px] mr-1';
        screen.appendChild(tmp5);
      } else {
        var tmp6 = document.createElement('img');
        tmp6.src = six;
        tmp6.className = 'w-[15%] h-fit max-h-[40px] max-w-[40px] mr-1';
        screen.appendChild(tmp6);
      }
    }
    var tmp = document.createElement('div');
    tmp.innerHTML = calculate(items);
    tmp.className = 'text-orange-300 text-2xl dark:text-white';
    screen.appendChild(tmp);
    screenTotal.appendChild(screen);
  }

  return (
    <div className="md:w-3/5 lg:w-3/5 w-full md:mb-10 flex flex-wrap items-end bg-gradient-radial dark:from-pink-300 dark:via-purple-300 dark:to-indigo-400 from-red-600 to-red-900  rounded-md border-[16px] border-mainBlack">
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
        <MessageModal ref={alertCountModalRef}>
          하루에 6번만 가능합니다!
        </MessageModal>
        <MessageModal ref={alertBettingPointModalRef}>
          배팅포인트를 1 ~ 1000 사이로 입력해주세요
        </MessageModal>
        <MessageModal ref={alertLoginModalRef}>
          로그인 후 이용해주세요!
        </MessageModal>
        <MessageModal ref={alertPointLackModalRef}>
          포인트가 부족합니다ㅜㅜ
        </MessageModal>
        <div id="buttonDiv" className="flex justify-around sm:inline-block">
          <button
            id="rollDice"
            onClick={rollDiceOnClick}
            className="sm:ml-3 sm:mr-5 mt-10 mb-3 shadow-2xl bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded dark:bg-divisionGray dark:text-mainBlack dark:hover:bg-slate-400"
          >
            start
          </button>
          <button
            id="chooseDice"
            onClick={result}
            className="mt-10 mb-3 bg-mainYellow shadow-2xl hover:bg-amber-500 text-white font-bold py-2 px-4 rounded dark:bg-divisionGray dark:text-mainBlack dark:hover:bg-slate-400"
          >
            확정
          </button>
          {fixed ? (
            <button
              id="chooseDice"
              onClick={refresh}
              className="sm:mx-5 mt-10 mb-3 shadow-2xl bg-mainYellow hover:bg-amber-500 text-white font-bold py-2 px-4 rounded dark:bg-divisionGray dark:text-mainBlack dark:hover:bg-slate-400"
            >
              reset
            </button>
          ) : null}
        </div>
      </div>
      <div className="sm:w-1/3 w-full">
        <div className="justify-self-center flex flex-col">
          <div id="result_img"></div>
          <div id="com_result"></div>
        </div>
        <div className="lg:text-base md:text-xs h-fit bg-white/20 rounded-md border-2 border-white dark:bg-gray-900 ">
          <div className="p-2 flex flex-col justify-center ">
            <div className="flex justify-between md:flex-wrap my-1">
              <strong className="text-slate-200 md:w-20 lg:w-24">
                보유 포인트
              </strong>
              <div className="text-right text-yellow-500 w-[70px] px-2 bg-white bg-opacity-20 rounded-md">
                {memberPoint}
              </div>
            </div>
            <div className="flex justify-between md:flex-wrap my-1">
              <strong className="text-slate-200 md:w-20 lg:w-24">
                참가 포인트
              </strong>
              {confirm ? (
                <input
                  id="point"
                  value={betting}
                  className="w-[70px] px-2 bg-white text-right h-fit rounded-md text-yellow-500"
                  onChange={onChange}
                ></input>
              ) : (
                <div className="text-yellow-500 w-[70px] text-right px-2 bg-white bg-opacity-20 rounded-md">
                  {betting}
                </div>
              )}
            </div>
            <div className="flex justify-between md:flex-wrap my-1">
              <strong className="text-slate-200 md:w-20 lg:w-24">
                주사위 점수
              </strong>
              <div className="text-yellow-500 w-[70px] px-2 bg-white bg-opacity-20 rounded-md text-right">
                {score}
              </div>
            </div>
            <div className="flex justify-between md:flex-wrap my-1">
              <strong className="text-slate-200 md:w-20 lg:w-24">
                잔여 횟수
              </strong>
              <div className="text-yellow-500 w-[70px] px-2 bg-white bg-opacity-20 rounded-md text-right">
                {MAX_PLAY_DICE - count}
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiceGame);
