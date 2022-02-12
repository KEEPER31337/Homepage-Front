import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import InfoBtn from './Components/InfoBtn';

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

const EditProfile = () => {
  const user = dummyUser;
  const params = useParams();
  const navigate = useNavigate();

  const cancleBtn = { text: '취소', onClick: () => navigate(-1) };
  const submitBtn = { text: '저장', onClick: () => navigate(-1) };

  const setProfileImg = async () => {
    console.log('setProfileImg');
  };

  const headBtns = [
    { text: '취소', onClick: () => navigate(-1) },
    { text: '저장', onClick: () => navigate(-1) },
    {
      text: '탈퇴',
      onClick: () => {
        console.log('remove');
      },
    },
  ];

  const renderImgBtn = () => (
    <button
      className="pr-2 w-3/12 object-cover hover:brightness-75"
      onClick={setProfileImg}
    >
      <img className="w-full h-full rounded-2xl" src={user.img} />
    </button>
  );

  const renderBody = () => (
    <div className="w-full">
      <InfoBox type="setPwd" params={{}} />
      <InfoBox type="setInfo" params={{}} />
      <InfoBox type="setSocial" params={{}} />
    </div>
  );

  return (
    <ProfileFrame
      user={user}
      profileBtns={headBtns}
      renderHeadLeft={renderImgBtn}
      renderBody={renderBody}
    />
  );
};

export default EditProfile;
