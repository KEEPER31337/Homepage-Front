import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusSmIcon, PaperClipIcon, CogIcon } from '@heroicons/react/solid';

//local
import studyAPI from 'API/v1/study';

const YearList = ({
  years,
  currentYear,
  currentSeason,
  setCurrentYear,
  setCurrentSeason,
}) => {
  useEffect(() => {
    console.log('load yearList');
  }, [years]);
  return (
    <>
      {/*<button
        type="button"
        className="inline-flex items-center text-mainYellow shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        <PlusSmIcon className="-ml-1.5 mr-1 h-5 w-5 " aria-hidden="true" />
        <span>
          <strong>Add</strong>
        </span>
  </button>*/}
      <div name="시즌 태그들" className="text-sm grid grid-cols-2 gap-1 px-2 ">
        <button
          className={
            (currentSeason == 1
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
            ' col-span-1 border-2 inline-block p-1 px-2 rounded-full '
          }
          onClick={() => setCurrentSeason(1)}
        >
          1학기
        </button>
        <button
          className={
            (currentSeason == 2
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
            ' col-span-1 border-2  inline-block p-1 px-2 rounded-full '
          }
          onClick={() => setCurrentSeason(2)}
        >
          여름 방학
        </button>
        <button
          className={
            (currentSeason == 3
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
            ' col-span-1 border-2 inline-block p-1 px-2 rounded-full '
          }
          onClick={() => setCurrentSeason(3)}
        >
          2학기
        </button>
        <button
          className={
            (currentSeason == 4
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
            ' col-span-1 border-2 inline-block p-1 px-2 rounded-full '
          }
          onClick={() => setCurrentSeason(4)}
        >
          겨울 방학
        </button>
      </div>
      <div className="grid grid-cols-4 sm:block gap-2">
        {years?.map((object, index) => (
          <button
            key={index}
            className={
              (currentYear == object.year
                ? 'bg-mainYellow '
                : 'bg-mainWhite dark:bg-mainBlack hover:shadow') +
              ' col-span-1 border rounded-lg border- w-full p-2  my-1'
            }
            onClick={() => {
              setCurrentYear(object.year);
              setCurrentSeason(1);
            }}
          >
            {object.year}년
          </button>
        ))}
      </div>
    </>
  );
};

export default YearList;
