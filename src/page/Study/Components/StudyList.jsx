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
import StudyCard from './StudyCard';

const StudyList = ({
  open,
  changeFlag,
  currentYear,
  currentSeason,
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

  var link =
    'https://enormous-button-c5d.notion.site/2021-7a9e28c746934f22863f7077fec061da';
  return (
    <>
      <div className="space-y-5">
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

        {studies && studies.length != 0 ? (
          studies.map((study, index) => (
            <div key={index}>
              <StudyCard study={study} setCurrentStudy={setCurrentStudy} />
            </div>
          ))
        ) : (
          <div className="flex items-center h-[40vh]">
            <p className="w-full text-gray-500 text-center">
              현재 등록된 스터디가 없습니다.
              <br />
              '+스터디 추가하기'를 클릭하여 스터디를 추가하세요.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(StudyList);
