import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ScoreBoardRank from './Components/ScoreBoardRank';
import ScoreBoardAnimation from './Components/ScoreBoardAnimation';
//api
import ctfAPI from 'API/v1/ctf';

const ScoreBoard = ({ member, ctfId }) => {
  const [rankList, setRankList] = useState([]);
  const [page, setPage] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);

  const goNextPage = () => {
    setPage(page + 1);
  };

  const goPrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    ctfAPI
      .getRanking({
        token: member.token,
        page: page,
        size: 7,
        ctfId: ctfId,
      })
      .then((data) => {
        if (data.success) {
          console.log(data.page.last);
          setCanGoPrev(data.page.first);
          setCanGoNext(data.page.last);
          setRankList(data.page.content);
        }
      });
  }, [page]);

  return (
    <div className="md:w-4/5 flex flex-col flex-1 p-3">
      <div className="h-full  w-full flex container mx-auto justify-center items-center">
        <div className="h-full w-full flex flex-col p-1 ">
          <div className="flex justify-between m-1">
            {/*제목*/}
            <div className="font-extrabold text-4xl m-1 dark:text-white">
              SCOREBOARD
            </div>
            {/*네비게이션*/}
            <div className="flex items-center">
              {canGoPrev ? (
                <button disabled className="cursor-not-allowed">
                  <ChevronLeftIcon className="inline-block mr-1 rounded h-10 w-10 text-white bg-slate-300" />
                </button>
              ) : (
                <button onClick={goPrevPage}>
                  <ChevronLeftIcon className="inline-block  dark:hover:bg-indigo-500 hover:bg-amber-500 mr-1 rounded h-10 w-10 text-white bg-amber-400 dark:bg-indigo-300" />
                </button>
              )}

              {canGoNext ? (
                <button disabled className="cursor-not-allowed">
                  <ChevronRightIcon className="inline-block mr-1 rounded h-10 w-10 text-white bg-slate-300" />
                </button>
              ) : (
                <button onClick={goNextPage}>
                  <ChevronRightIcon className="inline-block  dark:hover:bg-indigo-500 hover:bg-amber-500 mr-1 rounded h-10 w-10 text-white bg-amber-400 dark:bg-indigo-300" />
                </button>
              )}
            </div>
          </div>
          {/*구분선*/}
          <div className="p-[2px] mb-2 dark:from-purple-500 dark:via-purple-200 dark:to-amner-200 bg-gradient-to-r from-amber-500 via-amber-200 to-yellow-300  "></div>

          <div className="flex h-auto md:flex-row flex-col items-start justify-between w-full text-center dark:bg-darkPoint">
            <ScoreBoardAnimation />
            <ScoreBoardRank rankList={rankList} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};

export default connect(mapStateToProps)(ScoreBoard);
