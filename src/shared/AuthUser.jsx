import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//
import actionMember from 'redux/action/member';
import authAPI from 'API/v1/auth';

const AuthUser = ({ member, signOut, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (member.token) {
      console.log('tokenTest', member.token);
      authAPI.getAuth({ token: member.token }).then((data) => {
        if (data.code === -1003) {
          console.log('signOut', member.token, data);
          signOut();
        }
      });
    } else {
      const reduxState = JSON.parse(
        window.localStorage.getItem('persist:root')
      );
      const member = JSON.parse(reduxState.member);
      if (!member.token) {
        navigate('/signIn');
      }
    }
  }, [member]);
  return <>{children}</>;
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthUser);
