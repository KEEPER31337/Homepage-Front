import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusSmIcon, PaperClipIcon, CogIcon } from '@heroicons/react/solid';
//local
import AuthUser from 'shared/AuthUser';
import YearList from 'page/Study/Components/YearList';
import MobileYearList from 'page/Study/Components/MobileYearList';
import StudyList from 'page/Study/Components/StudyList';
import AddStudy from 'page/Study/Components/AddStudy';

const Study = () => {
  const [currentYear, setCurrentYear] = useState(2022);
  const [currentSeason, setCurrentSeason] = useState(1);
  return (
    <>
      <AuthUser>
        <div className="h-fit p-5 flex-col justify-end dark:bg-mainBlack dark:text-mainWhite">
          <MobileYearList
            currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            setCurrentSeason={setCurrentSeason}
          />
          <div className="md:flex sm:gap-x-6 ">
            <YearList
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
              setCurrentSeason={setCurrentSeason}
            />
            <div className="">
              <StudyList
                currentYear={currentYear}
                currentSeason={currentSeason}
                setCurrentSeason={setCurrentSeason}
              />
            </div>
          </div>
        </div>
      </AuthUser>
    </>
  );
};

export default Study;
