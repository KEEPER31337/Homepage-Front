import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';

import NavigationLayout from './Components/NavigationLayout';

const informationOfTeam = [
  {
    team: '김은지 바보 팀',
    score: '1000',
    members: ['김은지', '김재호', '박소현', '박정원', '이다은'],
  },
  {
    team: '장서윤 메롱 팀',
    score: '200',
    members: ['장서윤'],
  },
];

const informationOfPerson = [
  {
    id: 1,
    name: '김은지',
    captain: true,
    score: '200',
    solves: [
      ['forensic', 'forensic1', '09:00'],
      ['forensic', 'forensic2', '13:00'],
    ],
  },
  {
    id: 2,
    name: '김재호',
    captain: false,
    score: '200',
    solves: [
      ['web', 'web1', '9:30'],
      ['system', 'system1', '10:00'],
    ],
  },
  {
    id: 3,
    name: '박소현',
    captain: false,
    score: '200',
    solves: [
      ['reversing', 'reversing', '09:45'],
      ['forensic', 'forensic3', '14:00'],
    ],
  },
  {
    id: 4,
    name: '박정원',
    captain: false,
    score: '200',
    solves: [
      ['forensic', 'forensic4', '11:10'],
      ['crypto', 'crypto', '12:00'],
    ],
  },
  {
    id: 5,
    name: '이다은',
    captain: false,
    score: '200',
    solves: [
      ['mics', 'mics', '09:00'],
      ['osint', 'osint', '13:00'],
    ],
  },
  {
    id: 6,
    name: '장서윤',
    captain: true,
    score: '200',
    solves: [
      { type: 'forensic', title: 'quest1', time: '09:00' },
      { type: 'forensic', title: 'quest2', time: '13:00' },
    ],
  },
];

export default function Team() {
  const [modalStatus, setStatus] = useState(false);
  const [modalName, setName] = useState('');
  const [modalScore, setScore] = useState(0);
  const [modalQuest, setQuest] = useState([]);

  const openModal = (id) => {
    const person = informationOfPerson.filter((info) => {
      if (info.id === id) {
        return info;
      }
    });

    setName(person[0].name);
    setScore(person[0].score);
    setQuest(person[0].solves);
    setStatus(true);
  };

  const closeModal = () => {
    setStatus(false);
  };

  const TopSection = ({ nameOfTeam }) => {
    const team = informationOfTeam.filter((info) => nameOfTeam === info.team);
    return (
      <>
        <div className="mt-0 m-2 lg:h-60 pt-12 p-8 text-center grid grid-cols-1 content-center dark:text-white">
          <div className="text-4xl lg:text-5xl m-2 font-extrabold">
            {nameOfTeam}
          </div>
          <div className="lg:text-2xl">{team.score} points</div>
        </div>
        <div className="h-1 bg-gradient-to-r from-black via-red-800 to-amber-400 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-300"></div>
      </>
    );
  };

  const Members = ({ nameOfTeam }) => {
    const team = informationOfTeam.filter((info) => nameOfTeam === info.team);
    return (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center w-11/12 rounded overflow-hidden border dark:border-gray-700 m-4 p-2">
          <table classNem="justify-center dark:text-white w-11/12 border-2 shadow  rounded-md dark:bg-darkPoint">
            <thead>
              <tr className="rounded w-11/12 h-10 bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400 text-lg text-white font-extrabold text-center">
                <th className="pl-2 text-left">User Name</th>
                <th className="pr-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="dark:text-white">
              {team[0].members.map((info) => {
                const tmp = informationOfPerson.filter(
                  (person) => person.name === info
                );
                return (
                  <tr
                    onClick={() => {
                      openModal(tmp[0].id);
                    }}
                    className="w-11/12 h-10 hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                  >
                    <td className="pl-2 text-left">{tmp[0].name}</td>
                    <td className="pr-2 text-right">{tmp[0].score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Solves = ({ nameOfTeam }) => {
    const team = informationOfTeam.filter((info) => nameOfTeam === info.team);
    const members = team[0].members;
    const solves = [];
    members.map((info) => {
      informationOfPerson.map((person) => {
        if (info == person.name) {
          person.solves.map((quest) => {
            const tmp = quest;
            tmp.push(person.name);
            solves.push(tmp);
          });
        }
      });
    });

    return (
      <>
        <strong className="w-full text-4xl ml-2 mt-3">Solves</strong>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center w-11/12 rounded overflow-hidden border dark:border-gray-700 m-4 p-2">
            <table classNem="justify-center dark:text-white w-11/12 border-2 shadow  rounded-md dark:bg-darkPoint">
              <thead>
                <tr className="rounded w-10/12 h-10 bg-gray-100 text-lg">
                  <th>Type</th>
                  <th>Challenge</th>
                  <th>Value</th>
                  <th>User</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody className="dark:text-white">
                {solves.map((info) => {
                  return (
                    <tr className="w-11/12 h-10 text-center hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                      <td>{info[0]}</td>
                      <td>{info[1]}</td>
                      <td>100</td>
                      <td>{info[3]}</td>
                      <td>{info[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-mainWhite dark:bg-mainBlack">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl h-screen mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 pt-0 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          {/* <ScoreBoard/> */}
          <TopSection nameOfTeam="김은지 바보 팀" />
          <Members nameOfTeam="김은지 바보 팀" />
          <Solves nameOfTeam="김은지 바보 팀" />
        </div>
      </div>
      <Modal
        visible={modalStatus}
        width="600"
        height="400"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          <strong className="m-2">{modalName}</strong>
          <div className="m-5 p-3 flex flex-col items-center text-center">
            <div className="mb-5 p-3 flex flex-col items-center text-center">
              score : {modalScore}
              <br />
              {modalQuest.map((tmp) => {
                return (
                  <div>
                    {tmp[0]} {tmp[1]} {tmp[2]}
                  </div>
                );
              })}
            </div>
            <Button
              className="m-2"
              variant="contained"
              color="primary"
              onClick={() => {
                closeModal();
              }}
            >
              완료!
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
