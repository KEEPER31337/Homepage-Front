// shared
import PageContainer from 'shared/PageContainer';
import LayoutContainer from 'shared/LayoutContainer';

import React from 'react';
import { DiceGame, RuleOfDice, Information } from './Dice';
import { Roulette, RuleOfRoulette } from './Roulette';
import { Lotto, RuleOfLotto } from './Lotto';
import { useState } from 'react';

// image
import leftNav from './img/left_nav.png';
import RightNav from './img/right_nav.png';
import DiceNav from './img/dice_gameP.png';
import LottoNav from './img/lottoP.png';
import RouletteNav from './img/rouletteP.png';

const Game = () => {
  const [game, setGame] = useState(0);

  const onClickR = () => {
    setGame((prev) => (prev !== 2 ? prev + 1 : 0));
  };
  const onClickL = () => {
    setGame((prev) => (prev !== 0 ? prev - 1 : 2));
  };
  const onClickDice = () => {
    setGame(0);
  };
  const onClickRoul = () => {
    setGame(1);
  };
  const onClickLott = () => {
    setGame(2);
  };

  const GameLeftNav = () => {
    return (
      <img
        alt="왼쪽 화살표"
        className="flex-initial w-10 m-2"
        src={leftNav}
        onClick={onClickL}
      ></img>
    );
  };
  const GameRighttNav = () => {
    return (
      <img
        alt="오른쪽 화살표"
        className="flex-initial w-10 m-2"
        src={RightNav}
        onClick={onClickR}
      ></img>
    );
  };

  const GameList = () => {
    return (
      <div className="container flex">
        <img
          alt="주사위 게임"
          className="m-4 w-1/12 max-h-[60px] rounded-md border-5 border-mainBlack  hover:border-mainYellow"
          src={DiceNav}
          onClick={onClickDice}
        ></img>
        <img
          alt="룰렛"
          className="m-4 w-1/12 max-h-[60px] rounded-md border-5 border-mainBlack hover:border-mainYellow"
          src={LottoNav}
          onClick={onClickRoul}
        ></img>
        <img
          alt="복권"
          className="border-solid border-mainBlack border-5  m-4 w-1/12 max-h-[60px] rounded-md "
          src={RouletteNav}
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
          <div className="flex justify-center items-center h-3/5 container">
            <GameLeftNav />
            {game === 0 ? <DiceGame /> : null}
            {game === 1 ? <Roulette /> : null}
            {game === 2 ? <Lotto /> : null} {/* 나중에 lotto로 바꾸기! */}
            <GameRighttNav />
            {game === 0 ? <Information /> : null}
          </div>
          <hr className="mt-4 border-dashed border-4 border-mainYellow" />
          {game === 0 ? <RuleOfDice /> : null}
          {game === 1 ? <RuleOfRoulette /> : null}
          {game === 2 ? <RuleOfLotto /> : null} {/* 나중에 lotto로 바꾸기! */}
        </div>
      </LayoutContainer>
    </PageContainer>
  );
};

export default Game;
