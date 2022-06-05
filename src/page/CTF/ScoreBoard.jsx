import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import NavigationLayout from './Components/NavigationLayout';
import ScoreBoardRank from './Components/ScoreBoardRank';
import ScoreBoardAnimation from './Components/ScoreBoardAnimation';
//api
import ctfAPI from 'API/v1/ctf';

const ScoreBoard = ({ member }) => {
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    ctfAPI
      .getRanking({
        token: member.token,
        page: 0,
        size: 10,
        ctfId: 2,
      })
      .then((data) => {
        if (data.success) {
          // console.log
          console.log(data.page.content);
          setRankList(data.page.content);
        }
      });
  }, []);

  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}

          {/* <ScoreBoard/> */}
          <div className="h-full  w-full flex container mx-auto justify-center items-center">
            <div className="h-full w-full flex flex-col p-1 ">
              <div className="flex justify-between m-1">
                {/*제목*/}
                <div className="font-extrabold text-4xl m-1 dark:text-white">
                  SCOREBOARD
                </div>
                {/*네비게이션*/}
                <div className="flex items-center">
                  <ChevronLeftIcon className="inline-block  dark:hover:bg-indigo-400 mr-1 rounded h-10 w-10 text-white bg-amber-400 dark:bg-indigo-300" />

                  <ChevronRightIcon className="inline-block dark:hover:bg-indigo-400 rounded h-10 w-10 text-white bg-amber-400 dark:bg-indigo-300" />
                </div>
              </div>
              {/*구분선*/}
              <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>

              <div className="flex  h-full md:flex-row flex-col items-end justify-between w-full text-center ">
                <ScoreBoardAnimation />
                <ScoreBoardRank />
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

export default connect(mapStateToProps)(ScoreBoard);
