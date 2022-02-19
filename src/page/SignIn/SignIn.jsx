import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
  //NOTE 문제점 : 원래 onBlur로 id, pw state값이 바뀌는데, 그러려면 input값을 한번 클릭했다가 다른곳을 클릭해야 했습니다.
  //그런데, 자동완성기능은 홈페이지에 들어가면 바로 적용이 되서, onBlur기능으로 state값을 저장하게 되면 아예 빈 값으로 적용이 됬습니다.

  //NOTE flag => id, pw 둘다 빈칸일 경우, 알람 뜨게 하기 위해서
  const [flag, setFlag] = useState(0);
  //ref
  const id = useRef();
  const pw = useRef();

  const handleSignIn = (e) => {
    setFlag(1);
    //NOTE 바로 이 함수안에서 API로 넘어가면, 비동기때문에 state값이 적용이 바로 안됨. 빈내용으로 보내져서, 로그인 실패창이 뜸.
    setLoginInfo({ loginId: id.current.value, password: pw.current.value });

    //console.log(loginInfo);
  };
  useEffect(() => {
    if (id.current.value !== '' || pw.current.value !== '' || flag !== 0) {
      authAPI.signIn(loginInfo).then((data) => {
        if (data.success) {
          const token = data.data.token;
          const memberInfo = data.data.member;
          props.memberSignIn({ token, memberInfo });
          navigate(BACK);
        } else {
          loginFailModalRef.current.open();
        }
      });
    }
  }, [loginInfo]);

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
                ref={id}
                id="id"
                name="loginId"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-md  
              
              relative block w-full px-3 py-4 border border-gray-300 
              placeholder-gray-500  rounded-t-md focus:outline-none 
              focus:bg-backGray focus:border-backGray  focus:ring-backGray dark:bg-darkPoint dark:outline-white  dark:border-transparent
              "
                placeholder="아이디"
              />
            </div>

            <div>
              <input
                ref={pw}
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="appearance-none rounded-lg 
              relative block w-full px-3 py-4 border 
              border-gray-300 placeholder-gray-500 
               rounded-b-md focus:outline-none 
               
              focus:bg-backGray focus:border-backGray  focus:ring-backGray dark:bg-darkPoint dark:outline-white  dark:border-transparent

              focus:z-10 sm:text-sm"
                placeholder="비밀번호"
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
              <Link
                to="/signin/findid"
                className="font-medium 
            text-gray hover:text-pointYellow"
              >
                아이디 찾기
              </Link>{' '}
              |{' '}
              <Link
                to="/signin/findpassword"
                className="font-medium 
            text-gray hover:text-pointYellow"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>
          아직 계정이 없으신가요?
          <Link
            to="/signup"
            className="ml-4 whitespace-nowrap inline-flex items-center justify-center   text-base font-bold  text-mainYellow hover:text-pointYellow"
          >
            회원가입
          </Link>
          <div></div>
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
    memberSignIn: ({ token, memberInfo }) => {
      dispatch(actionMember.signIn({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
