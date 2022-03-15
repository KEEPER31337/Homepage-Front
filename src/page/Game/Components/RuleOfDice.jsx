import React from 'react';

const RuleOfDice = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="md:w-4/5 w-[97%] my-5 border-2 shadow-md flex flex-wrap justify-between dark:shadow-indigo-400 dark:text-white border-divisionGray rounded-md dark:border-indigo-400">
        <div className="sm:text-base text-xs m-5">
          게임 규칙
          <br />
          총 3번 주사위를 굴릴 수 있습니다.
          <br />
          주사위의 눈을 클릭하면 확정 할 수 있습니다.
          <br />
          <br />
          하루 6번까지 게임 가능합니다.
          <br />
          start 버튼을 눌려 주사위를 굴립니다.
          <br />
          reset 버튼을 눌려 주사위 게임을 새로 시작합니다.
        </div>
        <div className="sm:text-base text-xs m-5">
          주사위 점수 계산 방법
          <br />
          &nbsp;&nbsp;&nbsp;&#x2764;&nbsp;기본 점수
          <br />
          <div className="sm:text-[13px] text-[10px]">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            주사위 눈의 합
          </div>
          <br />
          &nbsp;&nbsp;&nbsp;&#x2764;&nbsp;추가 점수
          <br />
          <div className="sm:text-[13px] text-[10px]">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            4개의 주사위의 눈이 같은 경우 10점 추가
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            3개의 주사위와 2개의 주사위가 같은 경우 15점 추가
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            4개의 주사위가 순서대로 있는 경우 20점 추가
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            5개의 주사위가 순서대로 있는 경우 25점 추가
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            5개의 주사위가 모두 같은 경우 30점 추가
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleOfDice;
