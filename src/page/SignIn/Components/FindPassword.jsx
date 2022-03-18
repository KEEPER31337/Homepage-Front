import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
// asset
import Logo from 'assets/img/keeper_logo.png';

//custom hook
const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange];
};

const FindPassword = ({ member }) => {
  //
  const [emailAddress, setEmailAddress] = useInput('');

  //메시지 상태저장
  const [emailAddressMessage, setEmailAddressMessage] = useState('');
  const [findPwMessage, setFindPwMessage] = useState('');

  //유효성 검사
  const [isFindPw, setIsFindPw] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    //로그인된 상태에서 signin/findpassword페이지 접속할 경우
    if (member.token) {
      navigate('/');
    }
  }, [member]);

  const handleFindPw = () => {
    setEmailAddressMessage('이메일을 보내고 있습니다...');
    authAPI.findPassword({ emailAddress: emailAddress }).then((data) => {
      if (data.success) {
        setEmailAddressMessage('');

        setIsFindPw(true);
        setFindPwMessage(emailAddress + ' 로 임시비밀번호를 발송하였습니다.');
      } else {
        setEmailAddressMessage('해당 이메일을 가진 유저가 존재하지 않습니다');
        setIsFindPw(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:text-mainWhite dark:bg-mainBlack">
      <div className="max-w-md w-screen  ">
        <div className="text-red-500"></div>
        <div>
          <img className="mx-auto h-35 w-auto" src={Logo} alt="" />
        </div>
        <div className="w-full ">
          <h1 className="text-center mb-2 text-lg text-mainYellow font-semibold">
            비밀번호 찾기
          </h1>
          {isFindPw ? (
            <div className="text-center text-md mb-12">{findPwMessage}</div>
          ) : (
            <div className="text-center text-md mb-12">
              등록하신 이메일을 입력해주세요.
            </div>
          )}
        </div>
        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                autoComplete="off"
                required
                value={emailAddress}
                onChange={setEmailAddress}
                className="appearance-none rounded-md  
              
              relative block w-full px-3 py-4 border border-gray-300 
              placeholder-gray-500  rounded-t-md focus:outline-none 
              focus:bg-backGray focus:border-backGray  focus:ring-backGray dark:bg-darkPoint dark:outline-white  dark:border-transparent
              "
                placeholder="이메일"
              />
            </div>

            <p className="mt-3 text-sm font-medium text-red-500">
              {emailAddressMessage}
            </p>
          </div>
          <div>
            <button
              onClick={handleFindPw}
              className="group relative w-full 
            flex justify-center px-4 py-4 border 
            border-transparent text-sm font-medium 
            rounded-lg text-white bg-mainYellow 
            hover:bg-pointYellow "
            >
              찾기
            </button>
          </div>
        </div>

        <Link
          to="/signin"
          className="mr-4 mt-4 flex  justify-end   text-base font-bold  text-mainYellow hover:text-pointYellow"
        >
          <div>로그인 화면으로</div>
        </Link>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindPassword);
