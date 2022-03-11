import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';
import actionMember from 'redux/action/member';

const Profile = ({ token, memberInfo, updateInfo }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [btns, setBtns] = useState(new Array());
  const [isMe, setIsMe] = useState(false);
  const [isFollowee, setIsFollowee] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const [followTrigger, setFollowTrigger] = useState(false);
  const [unFollowTrigger, setUnFollowTrigger] = useState(false);
  const [giftPointTrigger, setGiftTrigger] = useState(false);

  useEffect(() => {
    if (followTrigger) {
      memberAPI.follow({ token, loginId: user.loginId }).then((result) => {
        if (result.success) {
          getUser();
          console.log('success', result);
        } else console.log('fail', result);
      });
      setFollowTrigger(false);
      getUser();
    }
  }, [followTrigger]);

  useEffect(() => {
    if (unFollowTrigger) {
      memberAPI.unfollow({ token, loginId: user.loginId }).then((result) => {
        if (result.success) {
          getUser();
          console.log(result);
        } else console.log(result);
      });
      setUnFollowTrigger(false);
      getUser();
    }
  }, [unFollowTrigger]);

  useEffect(() => {
    if (giftPointTrigger) {
      memberAPI
        .giftPoint({
          token,
          time: new Date().toISOString(),
          point: 10,
          detail: '선물 보내기 테스트',
          presentedId: params.userId,
        })
        .then((result) => {
          if (result.success) {
            console.log(result.data);
            memberInfo.point = result.data.finalPointMember;
          } else {
            console.log(`${result.code}:${result.msg}`);
          }
        });
      setGiftTrigger(false);
    }
  }, [giftPointTrigger]);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        if (!followTrigger) setFollowTrigger(true);
      },
    },
    {
      text: '포인트선물',
      onClick: () => {
        if (!giftPointTrigger) setGiftTrigger(true);
      },
    },
  ];
  const followerBtns = [
    {
      text: '팔로우취소',
      onClick: () => {
        if (!unFollowTrigger) setUnFollowTrigger(true);
      },
    },
    {
      text: '포인트선물',
      onClick: () => {
        if (!giftPointTrigger) setGiftTrigger(true);
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
          other.thumbnailId = other.thumbnailEntity;
          setUser(other);
          setIsFollowee(other.checkFollowee);
        } else {
          setUser(null);
          setError(`${getOtherResult.code}:${getOtherResult.msg}`);
        }
      });
  };

  useEffect(() => {
    updateInfo({ memberInfo });
  }, [memberInfo]);

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

  if (!user) {
    return <div className="text-red-500">{error}</div>;
  } else {
    return (
      <ProfileFrame
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
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ memberInfo }) => {
      dispatch(actionMember.updateInfo({ memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
