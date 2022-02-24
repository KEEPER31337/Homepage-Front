import React from 'react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import DeleteUserModal from './Components/DeleteUserModal';
import actionMember from 'redux/action/member';
import AuthUser from 'shared/AuthUser';

const dummyUser = {
  userId: '1',
  img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ad/ad3763fd50aff9d64b8f2a5619b2db9f43420ae2_full.jpg',
  name: '이름',
  nickName: '닉네임',
  loginId: 'userLoginId',
  level: 256,
  point: 78,
  github: 'jasper200207',
  groups: [
    {
      name: '정회원',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/753640/4018a8f2c5b6cb72162d157315f27fbdbb92050d.png',
    },
    {
      name: '우수회원',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/400630/21e2819817725efff601afc2e52b44772d80fb0a.png',
    },
    {
      name: '무직',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/400630/276a940028f208f167c3b8790eb11031d552f384.png',
    },
    {
      name: '무직',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/400630/276a940028f208f167c3b8790eb11031d552f384.png',
    },
  ],
  levelUp: 100,
  socialList: [
    {
      text: 'test',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/753640/4018a8f2c5b6cb72162d157315f27fbdbb92050d.png',
      onClick: () => {
        console.log('test');
      },
    },
    {
      text: 'test',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/753640/4018a8f2c5b6cb72162d157315f27fbdbb92050d.png',
      onClick: () => {
        console.log('test');
      },
    },
    {
      text: 'test',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/753640/4018a8f2c5b6cb72162d157315f27fbdbb92050d.png',
      onClick: () => {
        console.log('test');
      },
    },
    {
      text: 'test',
      img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/753640/4018a8f2c5b6cb72162d157315f27fbdbb92050d.png',
      onClick: () => {
        console.log('test');
      },
    },
  ],
};

const EditProfile = ({ token, memberInfo, signOut }) => {
  console.log(memberInfo);
  const user = dummyUser;
  const params = useParams();
  const navigate = useNavigate();

  const deleteModalRef = useRef({});

  const setProfileImg = async () => {
    console.log('setProfileImg');
  };

  const headBtns = [
    { text: '돌아가기', onClick: () => navigate(-1) },
    {
      text: '탈퇴',
      onClick: () => {
        deleteModalRef.current.open();
      },
    },
  ];

  const renderImgBtn = () => (
    <button
      className="pr-2 w-4/12 object-contain hover:brightness-75"
      onClick={setProfileImg}
    >
      <img className="w-full h-full rounded-2xl" src={user.img} />
    </button>
  );

  const renderBody = () => (
    <div className="w-full">
      <InfoBox
        type="setInfo"
        params={{ token: token, memberInfo: memberInfo }}
      />
      <InfoBox type="setEmail" params={{ token: token }} />
      <InfoBox type="setPwd" params={{ token: token }} />
    </div>
  );

  const deleteUser = async () => {};

  if (params.userId != memberInfo.id) {
    return <div>접근할수 없습니다</div>;
  } else {
    return (
      <div>
        <ProfileFrame
          user={user}
          profileBtns={headBtns}
          renderHeadLeft={renderImgBtn}
          renderBody={renderBody}
          memberInfo={memberInfo}
        />
        <DeleteUserModal
          token={token}
          signOut={signOut}
          ref={deleteModalRef}
        ></DeleteUserModal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
