import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlusSmIcon,
  PaperClipIcon,
  CogIcon,
  XIcon,
} from '@heroicons/react/solid';
//local
import SimpleCard from 'page/Study/Components/SimpleCard';
import AboutCard from 'page/Study/Components/AboutCard';
import AddStudy from 'page/Study/Components/AddStudy';
import { studylist } from 'page/Study/testData';

const StudyList = ({ currentYear, currentSeason, setCurrentSeason }) => {
  const [studies, setStudies] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('reload studyList');
    setStudies(studylist);
    setOpen(false);
  }, [currentYear, currentSeason]);

  var flag = true;
  var link =
    'https://enormous-button-c5d.notion.site/2021-7a9e28c746934f22863f7077fec061da';
  return (
    <>
      <div name="시즌 태그들" className="text-sm mt-5 md:text-xl">
        <button
          className={
            (currentSeason == 1
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100') +
            ' border-x-2 border-t-2  inline-block w-[5.5em] p-1 px-2 rounded-t-2xl '
          }
          onClick={() => setCurrentSeason(1)}
        >
          1학기
        </button>
        <button
          className={
            (currentSeason == 2
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100') +
            ' border-x-2 border-t-2  inline-block w-[5.5em] p-1 px-2 rounded-t-2xl '
          }
          onClick={() => setCurrentSeason(2)}
        >
          여름방학
        </button>
        <button
          className={
            (currentSeason == 3
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100') +
            ' border-x-2 border-t-2  inline-block w-[5.5em] p-1 px-2 rounded-t-2xl '
          }
          onClick={() => setCurrentSeason(3)}
        >
          2학기
        </button>
        <button
          className={
            (currentSeason == 4
              ? 'border-mainYellow bg-mainYellow'
              : 'hover:bg-slate-100') +
            ' border-x-2 border-t-2  inline-block w-[5.5em] p-1 px-2 rounded-t-2xl '
          }
          onClick={() => setCurrentSeason(4)}
        >
          겨울방학
        </button>
      </div>
      <div className="border-2 border-mainYellow rounded-b-lg rounded-tr-lg bg-gray-50 w-full px-5 md:w-[80vw] dark:bg-darkPoint">
        {/*link ? (
            <p className="border-b border-x bg-mainWhite my-3 p-3 rounded-lg dark:border-gray-700 dark:bg-mainBlack">
              노션 링크 :
              <a href={link} target="_blank">
                {' '}
                {link}
              </a>
            </p>
          ) : (
            ''
          )*/}
        <div name="스터디 추가버튼" className="flex justify-end m-3">
          <button
            type="button"
            className={
              (open
                ? 'text-mainWhite bg-mainYellow hover:bg-pointYellow dark:text-mainBlack'
                : 'text-gray-700 bg-white hover:bg-gray-100 dark:bg-darkComponent dark:text-gray-300') +
              ' inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full  focus:outline-none dark:border-mainBlack'
            }
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XIcon
                className={
                  'text-mainWhite dark:text-mainBlack -ml-1.5 mr-1 h-5 w-5 '
                }
                aria-hidden="true"
              />
            ) : (
              <PlusSmIcon
                className={'text-gray-400 -ml-1.5 mr-1 h-5 w-5 '}
                aria-hidden="true"
              />
            )}

            <span>스터디 추가하기</span>
          </button>
        </div>
        {open ? (
          <AddStudy
            setOpen={setOpen}
            currentYear={currentYear}
            currentSeason={currentSeason}
          />
        ) : (
          ''
        )}
        {studies ? (
          studies.map((study, index) => (
            <div key={index}>
              {flag ? (
                <AboutCard study={study} />
              ) : (
                <SimpleCard study={study} />
              )}
            </div>
          ))
        ) : (
          <div>현재 등록된 스터디가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default StudyList;
