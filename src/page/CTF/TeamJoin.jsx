import { connect } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationLayout from './Components/NavigationLayout';
import Logo from 'assets/img/keeper_logo.png';
import { GiftIcon, StarIcon } from '@heroicons/react/outline';

// API
import memberAPI from 'API/v1/member';
import teamAPI from 'API/v1/ctf';

// local
import MessageModal from 'shared/MessageModal';

const TeamJoin = ({ member }) => {
  const [openPage, setOpenPage] = useState(true);
  const [teamList, setTeamList] = useState([]);

  const alertTeamNameModalRef = useRef({});
  const alertTeamDescModalRef = useRef({});

  useEffect(() => {
    teamAPI
      .seeTeamList({
        page: 0,
        size: 10,
        ctfId: 2,
        token: member.token,
      })
      .then((data) => {
        if (data.success) {
          setTeamList(data.page.content);
        }
      });
  }, []);

  const Header = () => {
    const tmp1 =
      'bg-mainYellow w-20 py-2 rounded-tl-md rounded-tr-md text-center text-lg text-white mr-2';

    const tmp2 =
      'border-x-2 border-t-2 border-mainYellow w-20 py-2 rounded-tl-md rounded-tr-md text-center text-lg text-mainYellow mr-2';

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
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setDescription] = useState('');
    const onChangeTeamName = (e) => {
      setTeamName(e.target.value);
    };
    const onChangeTeamDes = (e) => {
      setDescription(e.target.value);
    };

    const teamCreateBtn = () => {
      console.log('akjdfkladjsfkljaslkd');

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
          contestId: 2,
          token: member.token,
        })
        .then((data) => {
          if (data.success) {
          } else {
            console.log(data.msg);
          }
        });
    };

    const teamJoinBtn = () => {
      console.log('눌렸당~!');
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
    <div className="bg-mainWhite dark:bg-mainBlack">
      {/* 기존 홈페이지 헤더에 맞추기 위해,  */}
      <div className="max-w-7xl h-screen mx-auto flex flex-row">
        {/*사이드바*/}
        <NavigationLayout />
        <div className="md:w-4/5 flex flex-col flex-1 pt-0 p-3">
          {/* 이제 여기서 추가할 컴포넌트 가져오면 됨!!! */}
          <Header />
          <Content />
        </div>
      </div>
      <MessageModal ref={alertTeamNameModalRef}>
        팀 명을 입력해주세요~!
      </MessageModal>
      <MessageModal ref={alertTeamDescModalRef}>
        팀 설명을 입력해주세요~!
      </MessageModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(TeamJoin);
