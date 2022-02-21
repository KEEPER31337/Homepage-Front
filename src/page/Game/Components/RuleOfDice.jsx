import React from 'react';

const RuleOfDice = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-4/5 my-5 p-5 border-2 shadow-md dark:shadow-pointYellow border-divisionGray rounded-md dark:border-pointYellow">
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

export default RuleOfDice;
