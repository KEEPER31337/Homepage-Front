import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { StarIcon } from '@heroicons/react/outline';
import firstGradeBadge from 'assets/img/ctfImg/badge_grade_first.gif';
import firstGradeBadgeDark from 'assets/img/ctfImg/badge_grade_first_dark.gif';
import secondGradeBadge from 'assets/img/ctfImg/badge_grade_second.png';
import secondGradeBadgeDark from 'assets/img/ctfImg/badge_grade_second_dark.png';
import thirdGradeBadge from 'assets/img/ctfImg/badge_grade_third.png';
import thirdGradeBadgeDark from 'assets/img/ctfImg/badge_grade_third_dark.png';
import OtherTeamInfoModal from './OtherTeamInfoModal';

// API
import ctfAPI from 'API/v1/ctf';

const ScoreBoardRank = ({ state, rankList }) => {
  const isDark = state.darkMode;
  const otherTeamInfoModalRef = useRef({});
  const [otherTeamInfo, setOtherTeamInfo] = useState();

  const clickTeamHandler = (info) => {
    //console.log(info, state.member.token);
    ctfAPI
      .seeTeamDetail({
        teamId: info.id,
        token: state.member.token,
      })
      .then((data) => {
        if (data.success) {
          //console.log(data);
          setOtherTeamInfo(data.data);
          otherTeamInfoModalRef.current.open();
        }
      });
  };

  return (
    <table className="table-fixed h-auto w-full lg:w-3/5 text-left bg-white dark:text-white dark:bg-darkPoint">
      <thead>
        <tr className="h-10 w-full bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400  text-lg text-white font-extrabold text-center ">
          <th className="w-1/12 text-left"></th>
          <th className="w-2/12 text-left">순위</th>
          <th className="w-5/12 text-left">팀</th>

          <th className="w-4/12 text-left">점수</th>
        </tr>
      </thead>
      <tbody>
        {rankList.map((info) => (
          <tr
            key={info.id}
            className="h-12 w-full hover:bg-gray-100 dark:hover:bg-slate-700   "
          >
            {/* shadow shadow-purple-300 */}
            <td className="h-12 w-1/12 truncate">
              {info.rank === 1 ? (
                <img
                  className="h-10"
                  src={isDark ? firstGradeBadgeDark : firstGradeBadge}
                />
              ) : (
                ''
              )}
              {info.rank === 2 ? (
                <img
                  className="h-10"
                  src={isDark ? secondGradeBadgeDark : secondGradeBadge}
                />
              ) : (
                ''
              )}
              {info.rank === 3 ? (
                <img
                  className="h-10"
                  src={isDark ? thirdGradeBadgeDark : thirdGradeBadge}
                />
              ) : (
                ''
              )}
            </td>
            <td className="w-2/12 truncate">{info.rank}</td>
            <td
              className="w-5/12 truncate"
              onClick={() => clickTeamHandler(info)}
            >
              {info.name}
            </td>
            <td className="w-4/12 truncate">
              <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
              {info.score}
            </td>
          </tr>
        ))}
      </tbody>
      <OtherTeamInfoModal
        ref={otherTeamInfoModalRef}
        otherTeamInfo={otherTeamInfo}
      />
    </table>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(ScoreBoardRank);
