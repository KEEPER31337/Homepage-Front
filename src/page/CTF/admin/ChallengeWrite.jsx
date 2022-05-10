import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';


const ChallengeWrite = ({ member, memberSignIn }) => {
  const [loginInfo, setLoginInfo] = useState({ loginId: '', password: '' });
  


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:text-mainWhite dark:bg-mainBlack">
      ctf문제 출제 페이지임당~~~~
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(ChallengeWrite);
