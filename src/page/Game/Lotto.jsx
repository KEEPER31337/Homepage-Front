import React from 'react';
import { useState } from 'react';

const Lotto = () => {
  return (
    <div className="bg-divisionGray h-full w-1/2 items-center m-10">
      Lotto 게임 화면! 여기다가 만들면 됩니당!
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
