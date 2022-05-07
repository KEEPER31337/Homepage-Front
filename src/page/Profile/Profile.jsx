import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import actionMember from 'redux/action/member';

//NOTE 프로필 UI
import './fonts.css';
import MyProfile from './MyProfile';
import OtherProfile from './OtherProfile';

const Profile = ({ token, memberInfo, updateInfo }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [followTrigger, setFollowTrigger] = useState(false);
  const [unFollowTrigger, setUnFollowTrigger] = useState(false);

  const giftPointModalState = useState(false);
  const [giftPointModal, setGiftPointModal] = giftPointModalState;

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
        if (!giftPointModal) setGiftPointModal(true);
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
        if (!giftPointModal) setGiftPointModal(true);
      },
    },
  ];

  useEffect(() => {
    updateInfo({ memberInfo });
  }, [memberInfo]);

  if (!params?.userId || !memberInfo?.id) return <></>;
  else if (params.userId == memberInfo.id) {
    return (
      <MyProfile
        token={token}
        memberInfo={memberInfo}
        updateInfo={updateInfo}
      />
    );
  } else {
    return (
      <OtherProfile
        token={token}
        memberInfo={memberInfo}
        userId={params.userId}
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
