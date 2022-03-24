import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileFrame from './Components/Frames/ProfileFrame';
import InfoBox from './Components/InfoBox';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';
import actionMember from 'redux/action/member';

//NOTE 프로필 UI
import './fonts.css';
import {
  AcademicCapIcon,
  GiftIcon,
  SparklesIcon,
  MailIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';
import MessageModal from 'shared/MessageModal';
import MyProfile from './MyProfile';
import OtherProfile from './OtherProfile';

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

  useEffect(() => {
    if (params.userId == memberInfo.id) {
      setIsMe(true);
    } else {
      setIsMe(false);
    }
  }, [params.userId, memberInfo.id]);

  if (isMe) {
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
