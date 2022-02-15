import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import blogImg from '../../assets/img/profileImg/social/blog.png';
import githubImg from '../../assets/img/profileImg/social/github.png';
import homePageImg from '../../assets/img/profileImg/social/homepage.png';
import instargramImg from '../../assets/img/profileImg/social/instargram.png';
import InfoBox from './Components/InfoBox';
import { useSelector } from 'react-redux';

const dummyUser = {
  userId: '1',
  img: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/ad/ad3763fd50aff9d64b8f2a5619b2db9f43420ae2_full.jpg',
  name: '이름',
  nickName: '닉네임',
  loginId: 'userLoginId',
  level: 256,
  point: 78,
  github: 'jasper200207',
  email: 'test@test.com',
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
      text: '블로그',
      img: blogImg,
      onClick: () => {
        console.log('blog');
      },
    },
    {
      text: 'jasper200207',
      img: githubImg,
      onClick: () => {
        console.log('github');
      },
    },
    {
      text: '홈페이지',
      img: homePageImg,
      onClick: () => {
        console.log('homepage');
      },
    },
    {
      text: '@인스타그램',
      img: instargramImg,
      onClick: () => {
        console.log('instargram');
      },
    },
  ],
};
const isMe = true;
const isFriend = false;

const Profile = () => {
  const user = dummyUser;
  const params = useParams();
  const navigate = useNavigate();
  const [btns, setBtns] = useState(new Array());

  const myBtns = [
    {
      text: '수정',
      onClick: () => {
        navigate('edit');
      },
    },
    {
      text: '마이페이지',
      onClick: () => {
        navigate('mypage/clipping');
      },
    },
  ];
  const otherBtns = [
    {
      text: '친구 등록',
      onClick: () => {
        console.log('friend');
      },
    },
    {
      text: '포인트선물',
      onClick: () => {
        console.log('points');
      },
    },
  ];
  const friendBtns = [
    {
      text: '친구 삭제',
      onClick: () => {
        console.log('friend');
      },
    },
    {
      text: '포인트선물',
      onClick: () => {
        console.log('points');
      },
    },
  ];

  useEffect(async () => {
    if (isMe) setBtns(myBtns);
    else if (isFriend) setBtns(friendBtns);
    else setBtns(otherBtns);
  }, [isMe, isFriend]);

  const renderBody = () => (
    <div className="w-full">
      <InfoBox type="postlist" params={{ userId: user.userId }} />
    </div>
  );

  return (
    <ProfileFrame user={user} profileBtns={btns} renderBody={renderBody} />
  );
};

export default Profile;
