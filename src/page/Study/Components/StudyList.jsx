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

  var flag = false;
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

        {studies ? (
          studies.map((study, index) => (
            <div key={index}>
              <StudyCard study={study} setCurrentStudy={setCurrentStudy} />
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
