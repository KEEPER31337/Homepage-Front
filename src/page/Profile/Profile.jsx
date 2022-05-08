import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import actionMember from 'redux/action/member';

//NOTE 프로필 UI
import './fonts.css';
import MyProfile from './MyProfile';
import OtherProfile from './OtherProfile';

const Profile = () => {
  //redux 연결
  const token = useSelector((store) => store.member.token);
  const memberInfo = useSelector((store) => store.member.memberInfo);
  //dispatch 예시
  const dispatch = useDispatch();
  const updateInfo = ({ memberInfo }) => {
    dispatch(actionMember.updateInfo({ memberInfo }));
  };

  const params = useParams();

  useEffect(() => {
    updateInfo({ memberInfo });
  }, [memberInfo]);

  if (!params?.userId || !memberInfo?.id) return <></>;
  else if (params.userId == memberInfo.id) {
    return <MyProfile token={token} memberInfo={memberInfo} />;
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

export default Profile;
