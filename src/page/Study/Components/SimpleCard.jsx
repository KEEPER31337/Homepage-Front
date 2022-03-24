import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusSmIcon, PaperClipIcon, CogIcon } from '@heroicons/react/solid';

const API_URL = process.env.REACT_APP_API_URL;

const AboutCard = ({ study }) => {
  return (
    <div
      name="디폴트 카드"
      className="border-4 w-full h-32 my-5 rounded-md shadow-lg hover:bg-slate-100 dark:bg-darkComponent"
    >
      <p className="text-2xl font-bold text-pointYellow">{study.title}</p>
    </div>
  );
};

export default AboutCard;
