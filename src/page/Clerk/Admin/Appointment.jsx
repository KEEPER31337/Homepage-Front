import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import { connect } from 'react-redux';
import Header from '../Components/Appointment/Header';
import Content from '../Components/Appointment/Content';
import getContentData from '../Components/Appointment/GetContentData';
const Appointment = ({ member }) => {
  useEffect(() => {}, []);

  const [type, setType] = useState(2); // 2 == 초기엔 활동인원

  const [ge, setGe] = useState(13); // 2 == 초기엔 활동인원
  const current = getContentData({ member, type, ge });
  return (
    <AuthUser>
      <div className="font-basic flex flex-1 flex-col items-center justify-between p-2">
        <Header type={type} setType={setType} setGe={setGe} />
        <Content typeMemberList={current} />
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Appointment);
