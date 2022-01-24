import React from 'react';
import { DiceGame, RuleOfDice, Information } from './Dice';
import { Roulette, RuleOfRoulette } from './Roulette';
import leftNav from './img/left_nav.png';
import RightNav from './img/right_nav.png';
import { useState } from 'react';

const Game = () => {
  const [game, setGame] = useState(true);

  const onClick = () => {
    setGame((prev) => !prev);
  };
  const GameLeftNav = () => {
    return <img className="h-1/5 m-30" src={leftNav} onClick={onClick}></img>;
  };
  const GameRighttNav = () => {
    return <img className="h-1/5 m-30" src={RightNav} onClick={onClick}></img>;
  };

  return (
    <div>
      <div className="flex justify-center items-center h-3/5 m-8">
        <GameLeftNav />
        {game ? <DiceGame /> : <Roulette />}
        <GameRighttNav />
        <Information />
      </div>
      <hr className="border-dashed border-4 border-mainYellow" />
      {game ? <RuleOfDice /> : <RuleOfRoulette />}
    </div>
  );
};

export default Game;
