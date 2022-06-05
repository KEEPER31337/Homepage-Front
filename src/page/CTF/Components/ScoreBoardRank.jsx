import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/outline';
import firstGradeBadge from 'assets/img/ctfImg/badge_grade_first.gif';
import firstGradeBadgeDark from 'assets/img/ctfImg/badge_grade_first_dark.gif';
import secondGradeBadge from 'assets/img/ctfImg/badge_grade_second.png';
import secondGradeBadgeDark from 'assets/img/ctfImg/badge_grade_second_dark.png';
import thirdGradeBadge from 'assets/img/ctfImg/badge_grade_third.png';
import thirdGradeBadgeDark from 'assets/img/ctfImg/badge_grade_third_dark.png';

//api
import memberAPI from 'API/v1/member';
import ctfAPI from 'API/v1/ctf';

const ScoreBoardRank = ({ member, state }) => {
  const isDark = state.darkMode;
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    ctfAPI
      .getRanking({
        token: member.token,
        page: 0,
        size: 8,
        ctfId: 2,
      })
      .then((data) => {
        if (data.success) {
          console.log(isDark);
          setRankList(data.page.content);
        }
      });
  }, []);

  return (
    <table className="h-full w-full lg:w-3/5 text-left bg-white dark:text-white dark:bg-darkPoint">
      {/* <colgroup>
      <col style="width"</colgroup> */}
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
          <tr key={info.id} className="h-10 w-full  ">
            {/* shadow shadow-purple-300 */}
            <td className="h-10">
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
            <td>{info.rank}</td>
            <td>{info.name}</td>
            <td>
              <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
              {info.score}
            </td>
          </tr>
        ))}

        <tr className="h-10 w-full">
          <td></td>
          <td>000</td>
          <td>기믄지</td>
          <td>
            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
            11
          </td>
        </tr>
        <tr className="h-10 w-full">
          <td></td>
          <td>000</td>
          <td>기믄지</td>
          <td>
            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
            11
          </td>
        </tr>
        <tr className="h-10 w-full">
          <td></td>
          <td>000</td>
          <td>기믄지</td>
          <td>
            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
            11
          </td>
        </tr>
        <tr className="h-10 w-full">
          <td></td>
          <td>000</td>
          <td>기믄지</td>
          <td>
            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
            11
          </td>
        </tr>
        <tr className="h-10 w-full">
          <td></td>
          <td>000</td>
          <td>8명까지 보여지게 할것임</td>
          <td>
            <StarIcon className="inline-block h-6 w-6 m-1 text-amber-400 dark:text-purple-300" />
            11
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member, state };
};

export default connect(mapStateToProps)(ScoreBoardRank);
