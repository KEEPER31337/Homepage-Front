import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';

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

const Profile = ({ token, memberInfo }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [btns, setBtns] = useState(new Array());
  const [isMe, setIsMe] = useState(false);
  const [isFollowee, setIsFollowee] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

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
        navigate('mypage/drafts');
      },
    },
  ];
  const unFollowerBtns = [
    {
      text: '팔로우하기',
      onClick: () => {
        memberAPI.follow({ token, loginId: user.loginId }).then((result) => {
          if (result.success) {
            getUser();
            console.log(result);
          } else console.log(result);
        });
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
        memberAPI.unfollow({ token, loginId: user.loginId }).then((result) => {
          if (result.success) {
            getUser();
            console.log(result);
          } else console.log(result);
        });
      },
    },
    {
      text: '포인트선물',
      onClick: () => {
        console.log('points');
      },
    },
  ];

  const getUser = () => {
    memberAPI
      .getOtherById({ token, id: params.userId })
      .then((getOtherResult) => {
        if (getOtherResult.success) {
          const other = getOtherResult.data;
          console.log(other);
          other.rank = other.memberRankEntity.name;
          other.type = other.memberTypeEntity.name;
          other.jobs = [];
          setUser(other);
          setIsFollowee(other.checkFollowee);
        } else {
          setUser(null);
          setError(`${getOtherResult.code}:${getOtherResult.msg}`);
        }
      });
  };

  useEffect(() => {
    if (params.userId == memberInfo.id) {
      setIsMe(true);
      setUser(memberInfo);
    } else {
      setIsMe(false);
      getUser();
    }
  }, [params.userId, memberInfo.id]);

  useEffect(() => {
    if (isMe) setBtns(myBtns);
    else if (isFollowee) setBtns(followerBtns);
    else setBtns(unFollowerBtns);
  }, [isMe, isFollowee]);

  const renderBody = () => (
    <div className="w-full">
      <InfoBox type="postlist" params={{ token: token }} />
    </div>
  );

  if (user == null) {
    return <div className="text-red-500">{error}</div>;
  } else {
    return (
      <ProfileFrame
        user={dummyUser}
        profileBtns={btns}
        renderBody={renderBody}
        memberInfo={user}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.member.token,
    memberInfo: state.member.memberInfo,
  };
};

export default connect(mapStateToProps)(Profile);
