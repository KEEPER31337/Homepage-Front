// shared
import PageContainer from 'shared/PageContainer';
import LayoutContainer from 'shared/LayoutContainer';

import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

// component
import { DiceGame, RuleOfDice } from './Components/Dice';
import { Roulette, RuleOfRoulette } from './Components/Roulette';
import { Lotto, RuleOfLotto } from './Components/Lotto';

// image
import LeftNav from './img/dice/nav_left.png';
import RightNav from './img/dice/nav_right.png';
import DarkLeftNav from './img/dice/nav_dark_left.png';
import DarkRightNav from './img/dice/nav_dark_right.png';
import DiceNav from './img/dice/img_dice.png';
import LottoNav from './img/dice/img_lotto.png';
import RouletteNav from './img/dice/img_roulette.png';

const TOTAL_GAME = 2;
const DICE_GAME_ID = 0;
const ROULETTE_GAME_ID = 1;
const LOTTO_GAME_ID = 2;

const Game = (props) => {
  const isDark = props.state.darkMode; //Dark모드 여부
  const [game, setGame] = useState(0);

  const onClickR = () => {
    setGame((prev) => (prev !== TOTAL_GAME ? prev + 1 : 0));
  };
  const onClickL = () => {
    setGame((prev) => (prev !== 0 ? prev - 1 : 2));
  };
  const onClickDice = () => {
    setGame(DICE_GAME_ID);
  };
  const onClickRoul = () => {
    setGame(ROULETTE_GAME_ID);
  };
  const onClickLott = () => {
    setGame(LOTTO_GAME_ID);
  };

  const GameLeftNav = () => {
    return (
      <img
        alt="왼쪽 화살표"
        className="flex-initial w-10 m-10 md:inline-block hidden"
        src={isDark ? DarkLeftNav : LeftNav}
        onClick={onClickL}
      ></img>
    );
  };
  const GameRighttNav = () => {
    return (
      <img
        alt="오른쪽 화살표"
        className="flex-initial w-10 m-10 md:inline-block hidden"
        src={isDark ? DarkRightNav : RightNav}
        onClick={onClickR}
      ></img>
    );
  };

  const GameList = () => {
    return (
      <div className="container flex">
        <img
          alt="주사위 게임"
          className="m-4 sm:ml-32 w-1/4 sm:w-1/12 max-h-[60px] rounded-md border-5 border-mainBlack  hover:border-mainYellow"
          src={DiceNav}
          onClick={onClickDice}
        ></img>
        <img
          alt="룰렛"
          className="m-4 w-1/4 sm:w-1/12 max-h-[60px] rounded-md border-5 border-mainBlack hover:border-mainYellow"
          src={RouletteNav}
          onClick={onClickRoul}
        ></img>
        <img
          alt="복권"
          className="border-solid border-mainBlack border-5  m-4 w-1/4 sm:w-1/12 max-h-[60px] rounded-md "
          src={LottoNav}
          onClick={onClickLott}
        ></img>
      </div>
    );
  };

  return (
    <PageContainer>
      <LayoutContainer>
        <div className="dark:bg-mainBlack">
          <GameList />
          <div className="flex justify-center items-center">
            <GameLeftNav />
            {game === DICE_GAME_ID ? <DiceGame /> : null}
            {game === ROULETTE_GAME_ID ? <Roulette /> : null}
            {game === LOTTO_GAME_ID ? <Lotto /> : null}
            <GameRighttNav />
          </div>
          {game === DICE_GAME_ID ? <RuleOfDice /> : null}
          {game === ROULETTE_GAME_ID ? <RuleOfRoulette /> : null}
          {game === LOTTO_GAME_ID ? <RuleOfLotto /> : null}
        </div>
      </LayoutContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};
export default connect(mapStateToProps)(Game);
