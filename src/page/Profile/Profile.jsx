import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import { connect, useSelector } from 'react-redux';

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
};
const isFollower = false;

const Profile = ({ token, memberInfo }) => {
  const user = dummyUser;
  const params = useParams();
  const navigate = useNavigate();
  const [btns, setBtns] = useState(new Array());
  const [isMe, setIsMe] = useState(false);

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
  const unFollowerBtns = [
    {
      text: '팔로우하기',
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
  const followerBtns = [
    {
      text: '팔로우취소',
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

  useEffect(() => {
    setIsMe(params.userId == memberInfo.id);
  }, [params.userId, memberInfo.id]);

  useEffect(async () => {
    if (isMe) setBtns(myBtns);
    else if (isFollower) setBtns(followerBtns);
    else setBtns(unFollowerBtns);
  }, [isMe, isFollower]);

  const renderBody = () => (
    <div className="w-full">
      <InfoBox type="postlist" params={{ userId: user.userId }} />
    </div>
  );

  return (
    <ProfileFrame
      user={user}
      profileBtns={btns}
      renderBody={renderBody}
      memberInfo={memberInfo}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};

export default connect(mapStateToProps)(Profile);
