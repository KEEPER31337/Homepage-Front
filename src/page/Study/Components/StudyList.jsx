import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  PlusSmIcon,
  PaperClipIcon,
  CogIcon,
  XIcon,
} from '@heroicons/react/solid';
//local
import SimpleCard from 'page/Study/Components/SimpleCard';
import AboutCard from 'page/Study/Components/AboutCard';
import studyAPI from 'API/v1/study';

const StudyList = ({
  open,
  changeFlag,
  currentYear,
  currentSeason,
  setCurrentSeason,
  setCurrentStudy,
  state,
}) => {
  const [studies, setStudies] = useState([]);

  const token = state.member.token;

  useEffect(() => {
    console.log('reload studyList');

    studyAPI
      .getStudies({
        token: token,
        year: currentYear,
        season: currentSeason,
      })
      .then((res) => {
        //console.log(res.list);
        setStudies(res.list);
      });
    //setOpen(false);
  }, [currentYear, currentSeason, open, changeFlag, token]);

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
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
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
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
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
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
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
              : 'hover:bg-slate-100 dark:border-darkComponent dark:hover:bg-gray-800') +
            ' border-x-2 border-t-2  inline-block w-[5.5em] p-1 px-2 rounded-t-2xl '
          }
          onClick={() => setCurrentSeason(4)}
        >
          겨울방학
        </button>
      </div>
      <div className="border-2 min-h-[60vh] border-mainYellow rounded-b-lg rounded-tr-lg bg-gray-50 w-full px-5 md:w-[80vw] dark:bg-darkPoint">
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

        {studies ? (
          studies.map((study, index) => (
            <div key={index}>
              {flag ? (
                <AboutCard study={study} setCurrentStudy={setCurrentStudy} />
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
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(StudyList);
