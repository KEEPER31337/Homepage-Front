import { connect } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';

import NavigationLayout from './Components/NavigationLayout';
import teamAPI from 'API/v1/ctf';
import MessageModal from 'shared/MessageModal';

import { CogIcon, BanIcon } from '@heroicons/react/outline';

const Team = ({ member }) => {
  const alertTeamModifyModalRef = useRef({});
  const alertTeamresignModalRef = useRef({});

  // 정보 수정 눌렸을 시 뜨는 모달과 관련된 state
  const [settingStatus, setSettingState] = useState(false);
  const [teamNameModal, setTeamNameModal] = useState('');
  const [teamDesModal, setTeamDesModal] = useState('');

  const onChangeTeamName = (e) => {
    setTeamNameModal(e.target.value);
  };
  const onChangeTeamDes = (e) => {
    setTeamDesModal(e.target.value);
  };

  // 탈퇴 눌렀을때 뜨는 모달
  const [banStatus, setBanState] = useState(false);

  // 일반적으로 띄워줄때 필요한 정보들
  const [teamName, setTeamName] = useState('');
  const [teamDes, setTeamDes] = useState('');
  const [teamScore, setTeamScore] = useState(0);
  const [teamId, setTeamId] = useState(-1);
  const [teamMember, setTeamMember] = useState([]);

  useEffect(() => {
    teamAPI
      .seeMyTeam({
        ctfId: 2,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setTeamName(data.data.name);
          setTeamDes(data.data.description);
          setTeamScore(data.data.score);
          setTeamId(data.data.id);
          teamAPI
            .seeTeamDetail({
              teamId: data.data.id,
              token: member.token,
            })
            .then((data) => {
              if (data.success) {
                setTeamMember(data.data.teamMembers);
                console.log('teamMember', data.data.teamMembers);
              } else {
                console.log('fail to seeTeamDetail', data);
              }
            });
        } else {
          console.log('fail to seeMyTeam : ', data);
        }
      });
  }, []);

  const openSettingModal = () => {
    setSettingState(true);
  };

  const closeSettingModal = () => {
    setSettingState(false);
  };

  const runReviseTeam = () => {
    teamAPI
      .reviseTeam({
        teamId: teamId,
        name: teamNameModal,
        description: teamDesModal,
        contestId: 2,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setTeamName(data.data.name);
          setTeamDes(data.data.description);
          setTeamId(data.data.id);
          alertTeamModifyModalRef.current.open();
        } else {
          console.log('fail to 수정', data);
        }
      });
  };

  const openBanModal = (id) => {
    setBanState(true);
  };

  const closeBanModal = () => {
    setBanState(false);
  };

  const runResignTeam = () => {
    teamAPI
      .resignTeam({
        ctfId: 2,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          alertTeamresignModalRef.current.open();
        } else {
          console.log('fail to 탈퇴', data);
        }
      });
  };

  const TopSection = () => {
    return (
      <>
        <div className="pt-12 text-center grid grid-cols-1 content-center dark:text-white">
          <div className="text-5xl m-2 font-extrabold">{teamName}</div>
          <div className="text-2xl">{teamDes}</div>
          <div>{teamScore} points</div>
        </div>
        <div className="flex justify-center m-2">
          <CogIcon className="h-7 w-7 m-1" onClick={openSettingModal} />
          <BanIcon className="h-6 w-6 m-1.5" onClick={openBanModal} />
        </div>
        <div className="h-1 bg-gradient-to-r from-black via-red-800 to-amber-400 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-300"></div>
      </>
    );
  };

  const Members = () => {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center w-11/12 rounded overflow-hidden border dark:border-gray-700 m-4 p-2">
          <table classNem="justify-center dark:text-white w-11/12 border-2 shadow  rounded-md dark:bg-darkPoint">
            <thead>
              <tr className="rounded w-11/12 h-10 bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400 text-lg text-white font-extrabold text-center">
                <th>Id</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody className="dark:text-white">
              {teamMember.map((info, idx) => {
                return (
                  <tr className="w-11/12 h-10 text-center hover:bg-gray-100 dark:hover:bg-[#0b1523]">
                    <td>{idx + 1}</td>
                    <td>{info.nickName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Solves = () => {
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
        <strong className="w-full text-4xl ml-2 mt-3 dark:text-white">
          Solves
        </strong>
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
      <div className="max-w-7xl h-full mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 pt-0 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          {/* <ScoreBoard/> */}
          <TopSection />
          <Members />
          {/* <Solves /> */}
        </div>
      </div>
      <Modal // 팀 정보 수정 클릭 시 뜨는 창
        visible={settingStatus}
        width="500"
        height="300"
        effect="fadeInDown"
        onClickAway={() => closeSettingModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          <div className="flex-auto flex justify-center w-2/3">
            팀명 :
            <input
              value={teamNameModal}
              onChange={onChangeTeamName}
              className="flex-auto p-2 mr-2 mb-2 border border-gray-300 rounded-md
                focus:bg-backGray focus:border-backGray  focus:ring-backGray
                focus:outline-none dark:bg-gray-600 dark:text-white"
              placeholder="팀명"
            />
          </div>
          <textarea
            rows={5}
            value={teamDesModal}
            onChange={onChangeTeamDes}
            className="w-2/3 p-2 border border-gray-300 rounded-md
                focus:bg-backGray focus:border-backGray  focus:ring-backGray
                focus:outline-none dark:bg-gray-600 dark:text-white"
            placeholder="팀 설명부탁드립니당~!"
          />
          <div className="flex flex-auto m-5">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeSettingModal();
              }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeSettingModal();
                runReviseTeam();
              }}
            >
              수정
            </Button>
          </div>
        </div>
      </Modal>
      <Modal // 팀 정보 수정 클릭 시 뜨는 창
        visible={banStatus}
        width="300"
        height="140"
        effect="fadeInDown"
        onClickAway={() => closeBanModal()}
      >
        <div className="m-5 p-3 flex flex-col items-center text-center">
          진심으로 탈퇴하는 겁니까???????
          <div className="flex m-8">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeBanModal();
              }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                closeBanModal();
                runResignTeam();
              }}
            >
              탈퇴
            </Button>
          </div>
        </div>
      </Modal>
      <MessageModal ref={alertTeamModifyModalRef}>
        팀 정보가 수정되었습니다~!
      </MessageModal>
      <MessageModal ref={alertTeamresignModalRef}>
        팀 탈퇴가 성공적으로 이루어졌습니다ㅜ
      </MessageModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Team);
