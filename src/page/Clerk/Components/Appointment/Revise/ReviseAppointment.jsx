import React, { useEffect, useState, useRef } from 'react';
import AuthUser from 'shared/AuthUser';
import { connect } from 'react-redux';
import memberAPI from 'API/v1/member';
import Header from './Header';
import Content from './Content';
import getContentData from './GetContentData';
const Appointment = ({ member }) => {
  useEffect(() => {}, []);

  const [type, setType] = useState(2); // 2 == 초기엔 활동인원
  const current = getContentData({ member, type });

  // 전체 회원 띄우기 위한 셋팅
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    memberAPI.getMembers({ token: member.token }).then((data) => {
      if (data.success) {
        setMemberList(data.list);
      }
    });
  }, [member]);
  return (
    <AuthUser>
      <div className="font-basic flex flex-1 flex-col items-center justify-between ">
        <Header type={type} setType={setType} />
        <Content
          type={type}
          typeMemberList={current}
          AllmemberList={memberList}
        />
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(Appointment);
