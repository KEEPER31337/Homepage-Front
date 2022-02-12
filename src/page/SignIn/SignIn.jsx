import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
import MessageModal from 'shared/MessageModal';
// asset
import Logo from 'assets/img/keeper_logo.png';

const BACK = -1;

const SignIn = (props) => {
  const [loginInfo, setLoginInfo] = useState({ loginId: '', password: '' });
  const loginFailModalRef = useRef({});
  const navigate = useNavigate();

  const handleBlur = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleSignIn = () => {
    authAPI.signIn(loginInfo).then((data) => {
      if (data.success) {
        const token = data.data.token;
        props.updateToken(token);
        navigate(BACK);
      } else {
        loginFailModalRef.current.open();
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:text-mainWhite dark:bg-mainBlack">
      <div className="max-w-md w-screen ">
        <div>
          <img className="mx-auto h-35 w-auto" src={Logo} alt="" />
        </div>

        {/* <form className="mt-8 space-y-8" action="#" method="POST"> */}
        <div className="mt-8 space-y-8">
          {/*1번째 div. 아이디 + 비밀번호 */}
          <div className="space-y-4">
            <div>
              <input
                id="id"
                name="loginId"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-md  
              
              relative block w-full px-3 py-4 border border-gray-300 
              placeholder-gray-500  rounded-t-md focus:outline-none 
              focus:bg-backGray focus:border-backGray  dark:bg-darkPoint dark:outline-white  dark:border-transparent
              "
                placeholder="아이디"
                onBlur={handleBlur}
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="appearance-none rounded-lg 
              relative block w-full px-3 py-4 border 
              border-gray-300 placeholder-gray-500 
               rounded-b-md focus:outline-none 
              focus:bg-backGray focus:border-backGray  dark:bg-darkPoint dark:outline-white  dark:border-transparent

              focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full 
            flex justify-center px-4 py-4 border 
            border-transparent text-sm font-medium 
            rounded-lg text-white bg-mainYellow 
            hover:bg-pointYellow "
              onClick={handleSignIn}
            >
              로그인
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="appearance-none h-4 w-4 border
              border-gray-300 checked:bg-mainYellow
              "
              />

              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm   
            text-gray
            hover:text-pointYellow"
              >
                로그인 상태 유지
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium 
            text-gray hover:text-pointYellow"
              >
                아이디 찾기
              </a>{' '}
              |{' '}
              <a
                href="#"
                className="font-medium 
            text-gray hover:text-pointYellow"
              >
                비밀번호 찾기
              </a>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
      <MessageModal ref={loginFailModalRef}>
        로그인에 실패하였습니다.
      </MessageModal>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateToken: (token) => {
      dispatch(actionMember.updateToken(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
