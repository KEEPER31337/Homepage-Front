import { connect } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import actionCtf from 'redux/action/ctf';
import { Link, useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import dayjs from 'dayjs';

// API
import teamAPI from 'API/v1/ctf';

// Modal
import TeamModal from './Components/TeamModal';
import AlertModal from './Components/AlertModal';
import SuccessModal from './Components/SuccessModal';

import { CogIcon, BanIcon } from '@heroicons/react/outline';
import noticeImg from 'assets/img/ctfImg/notice2.png';

const Team = ({ member, ctfId, updateCtfTeamName }) => {
  const alertTeamModifyModalRef = useRef({});
  const alertTeamresignModalRef = useRef({});
  const alertNoTeam = useRef({}); // 팀에 가입하지 않았을 때 뜨는 알림
  const alertTeamDuplicated = useRef({}); // 팀명이 중복될 때 뜨는 알림
  const alertTeamNameModalRef = useRef({}); // 팀명을 입력해달라는 알림
  const alertTeamDescModalRef = useRef({}); // 팀 설명을 입력해달라는 알림

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
  const [teamProb, setTeamProb] = useState([]);

  useEffect(() => {
    teamAPI
      .seeMyTeam({
        ctfId: ctfId,
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
                setTeamProb(data.data.solvedChallengeList);
              }
            });
        } else if (data.code === -13004) {
          alertNoTeam.current.open();
          setTeamName('');
          setTeamDes('');
          setTeamScore(0);
          setTeamMember([]);
          setTeamProb([]);
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
    if (teamNameModal === '') {
      alertTeamNameModalRef.current.open();
      return;
    } else if (teamDesModal === '') {
      alertTeamDescModalRef.current.open();
      return;
    }
    teamAPI
      .reviseTeam({
        teamId: teamId,
        name: teamNameModal,
        description: teamDesModal,
        contestId: ctfId,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setTeamName(data.data.name);
          setTeamDes(data.data.description);
          setTeamId(data.data.id);
          alertTeamModifyModalRef.current.open();
        } else if (data.code === -10001) {
          alertTeamDuplicated.current.open();
        }
      });
  };

  const openBanModal = (id) => {
    setBanState(true);
  };

  const closeBanModal = () => {
    setBanState(false);
  };
  const navigate = useNavigate();
  const runResignTeam = () => {
    teamAPI
      .resignTeam({
        ctfId: ctfId,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          updateCtfTeamName(null);
          alertTeamresignModalRef.current.open();
          //navigate('/ctf/teamjoin');
          // window.location.reload();
        }
      });
  };

  const TopSection = () => {
    return (
      <>
        <div className="pt-12 w-full text-center grid grid-cols-1 content-center dark:text-white">
          {/* <div className="text-5xl m-2 font-extrabold truncate">{teamName}</div> */}
          <div className="text-5xl m-2 font-extrabold w-full break-all">
            {teamName}
          </div>
          <div className="text-2xl w-full break-all">{teamDes}</div>
          <div>{teamScore} points</div>
        </div>
        <div className="flex justify-center m-2">
          <CogIcon
            className="h-7 w-7 m-1 dark:text-purple-300"
            onClick={openSettingModal}
          />
          <BanIcon
            className="h-6 w-6 m-1.5 dark:text-purple-300"
            onClick={openBanModal}
          />
        </div>
        <div className="h-1 bg-gradient-to-r from-black via-red-800 to-amber-400 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-300"></div>
      </>
    );
  };

  const Members = () => {
    return (
      <div className="flex flex-col items-center rounded overflow-hidden m-4 p-2">
        <table className="justify-center dark:text-white w-11/12 border-2 shadow  rounded-md dark:bg-darkPoint">
          <thead>
            <tr className="rounded w-11/12 h-10 bg-gradient-to-r from-amber-400 via-red-800 to-black dark:from-pink-300 dark:via-purple-400 dark:to-indigo-400 text-lg text-white font-extrabold text-center">
              <th>Id</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody className="dark:text-white">
            {teamMember.map((info, idx) => {
              return (
                <tr
                  key={idx}
                  className="w-11/12 h-10 text-center hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                >
                  <td>{idx + 1}</td>
                  <td>{info.nickName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const Solves = () => {
    return (
      <>
        <strong className="w-full text-4xl ml-2 mt-3 dark:text-white">
          Solves
        </strong>
        <div className="flex flex-col items-center rounded overflow-hidden m-4 p-2">
          <table className="table-fixed justify-center dark:text-white w-11/12 border-2 shadow  rounded-md dark:bg-darkPoint">
            <thead>
              <tr className="rounded w-10/12 h-10 bg-gray-100 text-lg text-black">
                <th>문제</th>
                <th>카테고리</th>
                <th>점수</th>
                <th>해치운 시간</th>
              </tr>
            </thead>
            <tbody className="dark:text-white">
              {teamProb.map((info, idx) => {
                return (
                  <tr
                    key={idx}
                    className="w-11/12 h-10 text-center hover:bg-gray-100 dark:hover:bg-[#0b1523]"
                  >
                    <td className="w-1/3 truncate">{info.title}</td>
                    <td className="w-1/3 truncate">
                      {info.categories.map((category, categoryIdx) => {
                        if (categoryIdx === info.categories.length - 1) {
                          return category.name;
                        }
                        return category.name + ', ';
                      })}
                    </td>
                    <td className="w-1/3 truncate">{info.score}</td>
                    <td className="w-1/3 truncate">
                      {info.solvedTime
                        ? dayjs(info.solvedTime).format('YYYY-MM-DD HH:mm:ss')
                        : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="md:w-4/5 flex flex-col flex-1 pt-0 p-3">
      {teamName === '' ? (
        <div className="pt-5 grid place-items-center mr-20">
          <img className="h-24 w-24" src={noticeImg} />
          <div className="flex whitespace-pre text-center dark:text-slate-200 text-4xl m-2 font-bold">
            <div className="text-red-500 ">팀 가입 </div>
            부탁드립니다.
          </div>
        </div>
      ) : (
        <>
          <TopSection />
          <Members />
          <Solves />
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
                  maxLength={45}
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
                maxLength={199}
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
        </>
      )}
      <SuccessModal ref={alertTeamModifyModalRef}>
        팀 정보가 수정되었습니다~!
      </SuccessModal>
      <TeamModal ref={alertTeamresignModalRef}>
        팀 탈퇴가 성공적으로 이루어졌습니다ㅜ
      </TeamModal>
      <AlertModal ref={alertTeamDuplicated}>
        동일한 팀명이 있습니다.. <br />한 발 늦었구만유~ ㅋ
      </AlertModal>
      <TeamModal ref={alertNoTeam}>
        가입한 팀을 찾을 수 없습니다 <br />팀 가입 부탁드립니다!
      </TeamModal>
      <AlertModal ref={alertTeamNameModalRef}>
        팀 명을 입력해주세요~!
      </AlertModal>
      <AlertModal ref={alertTeamDescModalRef}>
        팀 설명을 입력해주세요~!
      </AlertModal>
    </div>
  );
};

const mapStateToProps = (state, ctfId) => {
  return { member: state.member, ctfId: state.ctf.ctfId };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateCtfTeamName: (teamName) => {
      dispatch(actionCtf.updateTeamName(teamName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
