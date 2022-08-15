import { connect } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/img/keeper_logo.png';
import actionCtf from 'redux/action/ctf';
// API
import teamAPI from 'API/v1/ctf';

// local
import AlertModal from './Components/SuccessModal';

const TeamJoin = ({ member, ctfId, updateCtfTeamName }) => {
  const [openPage, setOpenPage] = useState(true);
  const [teamList, setTeamList] = useState([]);

  const alertTeamNameModalRef = useRef({}); // 팀명을 입력해달라는 알림
  const alertTeamDescModalRef = useRef({}); // 팀 설명을 입력해달라는 알림
  const alertTeamJoinComplete = useRef({}); // 팀에 가입되었다는 알림
  const alertTeamCreateComplete = useRef({}); // 팀이 생성되었다는 알림
  const alertTeamDuplicated = useRef({}); // 팀명이 중복될 때 뜨는 알림
  const alertNotExistTeam = useRef({}); // 존재하지 않는 팀 알림
  const alertAlreadyExistTeam = useRef({}); // 이미 팀에 가입한 알림

  const Header = () => {
    const tmp1 =
      'bg-mainYellow w-20 py-2 rounded-tl-md rounded-tr-md text-center text-lg text-white mr-2 mt-2';

    const tmp2 =
      'border-x-2 border-t-2 border-mainYellow w-20 py-2 rounded-tl-md rounded-tr-md text-center text-lg text-mainYellow mr-2 mt-2';

    return (
      <div className="flex mt-2 ml-2">
        <div
          onClick={() => setOpenPage(true)}
          className={openPage ? tmp1 : tmp2}
        >
          팀 생성
        </div>
        <div
          onClick={() => setOpenPage(false)}
          className={openPage ? tmp2 : tmp1}
        >
          팀 가입
        </div>
      </div>
    );
  };

  const Content = () => {
    const navigate = useNavigate();
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setDescription] = useState('');
    const onChangeTeamName = (e) => {
      setTeamName(e.target.value);
    };
    const onChangeTeamDes = (e) => {
      setDescription(e.target.value);
    };

    const teamCreateBtn = () => {
      if (teamName == '') {
        alertTeamNameModalRef.current.open();
        return;
      }
      if (teamDescription == '') {
        alertTeamDescModalRef.current.open();
        return;
      }

      teamAPI
        .createTeam({
          name: teamName,
          description: teamDescription,
          contestId: ctfId,
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
            updateCtfTeamName(data.data.name);
            navigate('/ctf/team');
          } else if (data.code === -10001) {
            alertTeamDuplicated.current.open();
          } else if (data.code === -9999) {
            alertAlreadyExistTeam.current.open();
          }
        });
      setTeamName('');
      setDescription('');
    };

    const teamJoinBtn = () => {
      if (teamName == '') {
        alertTeamNameModalRef.current.open();
        return;
      }
      teamAPI
        .joinTeam({
          teamName: teamName,
          contestId: ctfId,
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
            updateCtfTeamName(data.data.name);
            navigate('/ctf/team');
          } else if (data.code === -13004) {
            alertNotExistTeam.current.open();
          } else if (data.code === -9999) {
            alertAlreadyExistTeam.current.open();
          }
        });
      setTeamName('');
    };

    return (
      <>
        {openPage ? (
          <div className="rounded-md border-mainYellow border-2 drop-shadow-lg">
            <div className="w-full h-8 bg-mainYellow"></div>
            <img className="mx-auto mt-12 w-2/3" src={Logo} alt="" />

            <div className="mt-8 mb-12 flex flex-col items-center justify-center">
              <div className="flex-auto flex justify-center w-2/3">
                <input
                  maxLength={45}
                  value={teamName}
                  onChange={onChangeTeamName}
                  className="flex-auto p-2 mr-2 mb-2 border border-gray-300 rounded-md
                focus:bg-backGray focus:border-backGray  focus:ring-backGray
                focus:outline-none dark:bg-gray-600 dark:text-white"
                  placeholder="팀명"
                />
                <button
                  className="bg-amber-300 rounded-md p-1  mb-2 
                hover:bg-mainYellow border-2 border-amber-400  shadow-[inset_0_1px_1px_0px_#ffffff]"
                  onClick={teamCreateBtn}
                >
                  팀 생성하기~!
                </button>
              </div>
              <textarea
                rows={5}
                maxLength="199"
                value={teamDescription}
                onChange={onChangeTeamDes}
                className="w-2/3 p-2 border border-gray-300 rounded-md
                focus:bg-backGray focus:border-backGray  focus:ring-backGray
                focus:outline-none dark:bg-gray-600 dark:text-white"
                placeholder="팀 설명부탁드립니당~!"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-md border-mainYellow border-2 drop-shadow-lg">
              <div className="w-full h-8 bg-mainYellow"></div>
              <img className="mx-auto mt-12 w-2/3" src={Logo} alt="" />
              <div className="mx-auto mt-8 w-2/3 flex justify-center mb-12">
                <input
                  maxLength={45}
                  value={teamName}
                  onChange={onChangeTeamName}
                  className="flex-auto p-2 border border-gray-300 rounded-md
                focus:bg-backGray focus:border-backGray  focus:ring-backGray
                focus:outline-none dark:bg-gray-600 dark:text-white"
                  placeholder="팀명"
                />
                <button
                  className="bg-amber-300 rounded-md ml-2 p-1
                hover:bg-mainYellow border-2 border-amber-400  shadow-[inset_0_1px_1px_0px_#ffffff]"
                  onClick={teamJoinBtn}
                >
                  팀 가입하기~!
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="md:w-4/5 flex flex-col flex-1 pt-0 p-3">
      {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
      <Header />
      <Content />

      <AlertModal ref={alertTeamNameModalRef}>
        팀 명을 입력해주세요~!
      </AlertModal>
      <AlertModal ref={alertTeamDescModalRef}>
        팀 설명을 입력해주세요~!
      </AlertModal>
      <AlertModal ref={alertTeamDuplicated}>
        동일한 팀명이 있습니다.. <br />한 발 늦었구만유~ ㅋ
      </AlertModal>
      <AlertModal ref={alertNotExistTeam}>
        존재하지 않는 팀입니다~!
        <br />
        다시 확인해주십쇼!
      </AlertModal>
      <AlertModal ref={alertAlreadyExistTeam}>
        가입한 팀이 존재합니다!
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamJoin);
