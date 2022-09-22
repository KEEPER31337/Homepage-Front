import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CheckContent from './CheckContent';
import clerkAPI from 'API/v1/clerk';

const Content = ({ token, type, typeMemberList, changeItems }) => {
  return (
    <>
      {typeMemberList.map((member, index) => (
        <CheckContent
          key={member.memberId}
          type={type}
          member={member}
          changeItems={changeItems}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { token: state.member.token };
};

export default connect(mapStateToProps)(Content);
