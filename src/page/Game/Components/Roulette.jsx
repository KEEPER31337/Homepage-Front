import React from 'react';
import { useState } from 'react';

const Roulette = () => {
  return (
    <div className="bg-divisionGray h-full w-1/2 items-center m-10">
      Roulette
    </div>
  );
};

const RuleOfRoulette = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 my-5 p-5 border-2 border-divisionGray">
        게임 규칙
        <br />
        매일 3번까지 구매 가능합니다.
        <br />
        start 버튼을 눌려 주사위를 굴립니다.
        <br />
        수령을 클릭하면 당첨 포인트가 수령됩니다.
      </div>
    </div>
  );
};

export { Roulette, RuleOfRoulette };
