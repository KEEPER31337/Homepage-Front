import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlusSmIcon,
  PaperClipIcon,
  CogIcon,
  XIcon,
} from '@heroicons/react/solid';
import { connect } from 'react-redux';
//local
import { getCurrentYear, getCurrentSeason } from './StudyUtil';
import AuthUser from 'shared/AuthUser';
import YearList from 'page/Study/Components/YearList';
import MobileYearList from 'page/Study/Components/MobileYearList';
import StudyList from 'page/Study/Components/StudyList';
import AddStudy from 'page/Study/Components/AddStudy';
import ModifyModal from 'page/Study/Components/Modals/ModifyModal';
import studyAPI from 'API/v1/study';

const Study = ({ state }) => {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentSeason, setCurrentSeason] = useState(getCurrentSeason());
  const [currentStudy, setCurrentStudy] = useState();
  const [years, setYears] = useState([]);
  const [open, setOpen] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);
  const token = state.member.token;

  useEffect(() => {
    if (token) {
      console.log(years);
      studyAPI
        .getYears({
          token: token,
        })
        .then((res) => {
          //console.log(res.list);

          setYears(res.list.reverse());
        });
    }
  }, [token, changeFlag]);

  return (
    <div className="font-basic dark:bg-mainBlack dark:text-mainWhite">
      <AuthUser>
        {currentStudy ? (
          <ModifyModal
            currentStudy={currentStudy}
            setCurrentStudy={setCurrentStudy}
            changeFlag={changeFlag}
            setChangeFlag={setChangeFlag}
          />
        ) : (
          ''
        )}
        <div className="min-h-screen max-w-3xl mx-auto px-2 py-4 space-y-4 sm:space-y-0 md:max-w-5xl sm:px-3 md:px-8 sm:grid sm:grid-cols-12 sm:gap-x-3 md:gap-x-5">
          <div name="좌측 사이드바" className=" sm:col-span-3">
            <div className="border shadow-md sticky top-4 rounded-lg py-5 px-3 bg-gray-50 space-y-4 dark:bg-darkPoint dark:border-gray-700">
              <YearList
                years={years}
                currentYear={currentYear}
                currentSeason={currentSeason}
                setCurrentYear={setCurrentYear}
                setCurrentSeason={setCurrentSeason}
              />
            </div>
          </div>
          <div className="min-h-[80vh] space-y-4 sm:col-span-9">
            {/*<AddStudyModal
                open={open}
                setOpen={setOpen}
                currentYear={currentYear}
                currentSeason={currentSeason}
  />*/}
            <div name="스터디 추가버튼" className="flex justify-end ">
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
                currentYear={currentYear}
                currentSeason={currentSeason}
                setOpen={setOpen}
                changeFlag={changeFlag}
                setChangeFlag={setChangeFlag}
              />
            ) : (
              ''
            )}

            <StudyList
              changeFlag={changeFlag}
              open={open}
              currentYear={currentYear}
              currentSeason={currentSeason}
              setCurrentStudy={setCurrentStudy}
            />
          </div>
        </div>
      </AuthUser>
    </div>
  );
};
const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(Study);
