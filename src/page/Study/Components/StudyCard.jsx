import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlusSmIcon,
  PaperClipIcon,
  CogIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid';
import { connect } from 'react-redux';
import AboutCard from './AboutCard';
import SimpleCard from './SimpleCard';

const API_URL = process.env.REACT_APP_API_URL;

const StudyCard = ({ study, setCurrentStudy, state }) => {
  const [flag, setFlag] = useState(false);
  return (
    <>
      {flag ? (
        <AboutCard
          study={study}
          setCurrentStudy={setCurrentStudy}
          setFlag={setFlag}
        />
      ) : (
        <SimpleCard study={study} setFlag={setFlag} />
      )}
    </>
  );
};

export default StudyCard;
