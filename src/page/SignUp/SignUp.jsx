import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
// local
import authAPI from 'API/v1/auth';
import actionMember from 'redux/action/member';
import MessageModal from 'shared/MessageModal';

//custom hook
const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange];
};

const SignUp = ({ member }) => {
  //아이디, 비밀번호, 비밀번호 확인, 이메일, 이름, 닉네임, 학번
  const [loginId, setLoginId] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useInput('');
  const [emailAddress, setEmailAddress] = useInput('');
  const [authCode, setAuthCode] = useInput('');
  const [realName, setRealName] = useInput('');
  const [nickName, setNickName] = useInput('');
  const [studentId, setStudentId] = useInput('');
  const [birthday, setBirthday] = useInput('');

  //오류메시지 상태저장
  const [loginIdMessage, setLoginIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [emailAddressMessage, setEmailAddressMessage] = useState('');
  const [authCodeMessage, setAuthCodeMessage] = useState('');
  const [realNameMessage, setRealNameMessage] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [studentIdMessage, setStudentIdMessage] = useState('');

  //유효성 검사
  const [isLoginId, setIsLoginId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmailAddress, setIsEmailAddress] = useState(false);
  const [isRealName, setIsRealName] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isStudentId, setIsStudentId] = useState(false);

  // ref
  const sendSuccessModalRef = useRef({});
  const sendFailModalRef = useRef({});
  const signUpSuccessModalRef = useRef({});
  const signUpFailModalRef = useRef({});

  const navigate = useNavigate();
  useEffect(() => {
    //로그인된 상태에서 signup페이지 접속할 경우
    if (member.token) navigate('/');
  }, [member]);

  //NOTE 유효성 검사

  //비밀번호
  const handlePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

    if (!passwordRegex.test(password)) {
      setPasswordMessage('8~20자 영문과 숫자를 사용하세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  };

  // 비밀번호 확인
  const handlePasswordConfirm = (e) => {
    if (password === passwordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치합니다.');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirm(false);
    }
  };

  // 인증코드
  const handleAuthCode = (e) => {
    if (e.target.value.length === 0)
      setAuthCodeMessage('인증코드를 입력해주세요');
    else setAuthCodeMessage('');
  };

  // 이름
  const handleRealName = (e) => {
    const realNameRegex = /^[가-힣a-zA-Z]{1,20}$/;

    if (!realNameRegex.test(e.target.value)) {
      setRealNameMessage('1~20자 한글, 영어만 가능합니다');
      setIsRealName(false);
    } else {
      setRealNameMessage('올바른 이름 형식입니다.');
      setIsRealName(true);
    }
  };
  // 닉네임
  const handleNickName = (e) => {
    const nickNameRegex = /^[a-zA-Z가-힣0-9]{1,16}$/;

    if (!nickNameRegex.test(e.target.value)) {
      setNickNameMessage('1~16자 한글, 영어, 숫자만 가능합니다');
      setIsNickName(false);
    } else {
      setNickNameMessage('올바른 닉네임 형식입니다.');
      setIsNickName(true);
    }
  };

  //NOTE 유효성 검사 + 중복 체크 api

  //아이디
  //TODO 아이디 중복체크 api 확인!!! 중복인데도 반환값이 false나옴
  const handleLoginId = () => {
    const loginIdRegex = /^[a-zA-Z0-9_]{4,12}$/;

    if (!loginIdRegex.test(loginId)) {
      setLoginIdMessage("4~12자 영어, 숫자, '_' 만 가능합니다");
      setIsLoginId(false);
    } else {
      //유효성 검사 통과했을 경우에만, 중복 체크 api작동하게
      authAPI.loginIdCheck({ loginId: loginId }).then((data) => {
        if (!data.data) {
          setLoginIdMessage('올바른 아이디 형식입니다.');
          setIsLoginId(true);
        } else {
          setLoginIdMessage('이미 존재하는 아이디입니다');
          setIsLoginId(false);
        }
      });
    }
  };

  //이메일 체크
  const handleEmailAddress = () => {
    const emailAddressRegex =
      /^([0-9a-zA-Z_]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailAddressRegex.test(emailAddress)) {
      setEmailAddressMessage('이메일 형식이 틀렸습니다');
      setIsEmailAddress(false);
    } else {
      //유효성 검사 통과했을 경우에만, 중복 체크 api작동하게
      authAPI.emailCheck({ emailAddress: emailAddress }).then((data) => {
        if (!data.data) {
          setEmailAddressMessage(
            '올바른 이메일 형식입니다. 인증버튼을 눌러주세요'
          );
          setIsEmailAddress(true);
        } else {
          setEmailAddressMessage('이미 존재하는 이메일입니다.');
          setIsEmailAddress(false);
        }
      });
    }
  };

  //이메일 인증 보내기 (이메일 유효성검사 통과했을 경우만, 인증버튼 활성화 시킴)
  const handleSendMail = () => {
    authAPI.emailAuth({ emailAddress: emailAddress }).then((data) => {
      if (data.success) sendSuccessModalRef.current.open();
      else sendFailModalRef.current.open();
    });
    // NOTE : 보내는 중이라는 (보냈다는) 표시
    setEmailAddressMessage('해당 메일로 인증코드를 보냈습니다.');
  };

  //학번
  const handleStudentId = () => {
    const studentIdRegex = /^[0-9]+$/;

    if (!studentIdRegex.test(studentId)) {
      setStudentIdMessage('숫자 입력만 가능합니다');
      setIsStudentId(false);
    } else {
      //유효성 검사 통과했을 경우에만, 중복 체크 api작동하게
      authAPI.studentIdCheck({ studentId: studentId }).then((data) => {
        if (!data.data) {
          setStudentIdMessage('올바른 학번 형식입니다.');
          setIsStudentId(true);
        } else {
          setStudentIdMessage('이미 존재하는 학번입니다');
          setIsStudentId(false);
        }
      });
    }
  };

  const handleSignUp = () => {
    authAPI
      .signUp({
        // NOTE : API parameter랑 통일
        loginId,
        emailAddress,
        password,
        realName,
        authCode,
        nickName,
        birthday,
        studentId,
      })
      .then((data) => {
        if (data.success) {
          signUpSuccessModalRef.current.open();
        } else {
          signUpFailModalRef.current.open();
        }
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:text-mainWhite dark:bg-mainBlack">
        <div className="max-w-md w-screen">
          <div>
            <div className="mt-4 ">
              <h3 className="text-lg font-medium leading-6 ">회원가입</h3>
              <p className="mt-1 text-sm">키퍼 회원가입 페이지입니다!</p>

              <p className="text-pointYellow"></p>
            </div>

            <div className="mt-8 border-t border-divisionGray pt-4">
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {/* 아이디 */}
                <div className="sm:col-span-2">
                  <label htmlFor="id" className="block text-sm font-medium ">
                    아이디
                  </label>
                  <div className="mt-2 ">
                    <input
                      type="text"
                      id="id"
                      name="id"
                      required
                      value={loginId}
                      onChange={setLoginId}
                      onBlur={handleLoginId}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>
                  <div
                    className={`block text-sm font-medium text${
                      isLoginId ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {loginIdMessage}
                  </div>
                </div>

                {/* 비밀번호 */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    비밀번호
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={password}
                      onChange={setPassword}
                      //NOTE
                      //1. 맨처음, 최초렌더링때 자동완성 값 불러오기를 해결을 못해
                      // autoComplete="new-password" 로 최초렌더링때 자동 자동완성을 막음
                      //2.  크롬에서 자동완성 기능은 비밀번호를 입력할때, 아이디+비밀번호가 동시에 입력이됨
                      //다른 자동완성은, 어차피 onBlur처리때문에 신경 안써줘도 됨.
                      onBlur={() => {
                        handlePassword();
                        handleLoginId();
                      }}
                      autoComplete="new-password"
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>

                  <div
                    className={`block mt-1 text-sm font-medium text${
                      isPassword ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {passwordMessage}
                  </div>
                </div>

                {/* 비밀번호 확인 */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium "
                  >
                    비밀번호 확인
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      value={passwordConfirm}
                      onChange={setPasswordConfirm}
                      onBlur={() => {
                        handlePasswordConfirm();
                        handleLoginId();
                      }}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>
                  <div
                    className={`block mt-1 text-sm font-medium text${
                      isPasswordConfirm ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {passwordConfirmMessage}
                  </div>
                </div>

                {/* 이메일 */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email_address"
                    className="block text-sm font-medium "
                  >
                    이메일
                  </label>
                  <div className="mt-2 flex  ">
                    <input
                      type="email"
                      id="email_address"
                      name="email_address"
                      required
                      value={emailAddress}
                      onChange={setEmailAddress}
                      onBlur={handleEmailAddress}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />

                    <button
                      type="submit"
                      className={` px-2 py-1 ml-2 border border-transparent
                    text-sm font-medium rounded-lg text-white 
                    ${
                      isEmailAddress
                        ? 'bg-mainYellow hover:bg-pointYellow'
                        : 'bg-divisionGray dark:bg-darkPoint'
                    }`}
                      onClick={handleSendMail}
                      disabled={!isEmailAddress}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`block mt-1 text-sm font-medium text${
                      isEmailAddress ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {emailAddressMessage}
                  </div>
                </div>

                {/* 인증코드 */}
                <div className="sm:col-span-2">
                  <div className="flex justify-items-center">
                    <label
                      htmlFor="auth_code"
                      className="block mt-1 text-sm font-medium "
                    >
                      {/* NOTE: vertical align */}
                      인증코드
                    </label>
                  </div>
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      id="auth_code"
                      name="auth_code"
                      required
                      value={authCode}
                      onChange={setAuthCode}
                      onBlur={handleAuthCode}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>
                  <div className="block mt-1 text-sm font-medium text-red-500">
                    {authCodeMessage}
                  </div>
                </div>
                {/* 이름 */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="realName"
                    className="block text-sm font-medium "
                  >
                    이름
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="realName"
                      name="realName"
                      required
                      value={realName}
                      onChange={setRealName}
                      onBlur={handleRealName}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>
                  <div
                    className={`block mt-1 text-sm font-medium text${
                      isRealName ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {realNameMessage}
                  </div>
                </div>
                {/* 닉네임 */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="nickName"
                    className="block mt-1 text-sm font-medium "
                  >
                    닉네임
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="nickName"
                      name="nickName"
                      required
                      value={nickName}
                      onChange={setNickName}
                      onBlur={handleNickName}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>
                  <div
                    className={`block mt-1 text-sm font-medium text${
                      isNickName ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {nickNameMessage}
                  </div>
                </div>
                {/* 학번 */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="studentNumber"
                    className="block text-sm font-medium "
                  >
                    학번
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="studentNumber"
                      name="studentNumber"
                      required
                      value={studentId}
                      onChange={setStudentId}
                      onBlur={handleStudentId}
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                    />
                  </div>
                  <div
                    className={`block mt-1 text-sm font-medium text${
                      isStudentId ? '-pointYellow' : '-red-500'
                    }`}
                  >
                    {studentIdMessage}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium "
                  >
                    생일
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      id="date_birthday"
                      name="birthday"
                      className=" rounded-md block w-full px-1 py-1 border border-divisionGray dark:border-transparent focus:border-mainYellow focus:ring-mainYellow dark:focus:border-mainWhite dark:focus:ring-mainWhite dark:bg-darkPoint autofill:bg-yellow-200"
                      onChange={setBirthday}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-divisionGray pt-10">
              <button
                type="submit"
                disabled={
                  !(
                    isLoginId &&
                    isEmailAddress &&
                    isPassword &&
                    isPasswordConfirm &&
                    isNickName &&
                    isRealName &&
                    isStudentId
                  )
                }
                onClick={handleSignUp}
                className={`group relative w-full 
                flex justify-center px-4 py-4 border 
                border-transparent text-lg font-bold
                rounded-lg text-white hover:pointYellow dark:hover:darkPoint
                 
                ${
                  isLoginId &&
                  isEmailAddress &&
                  isPassword &&
                  isPasswordConfirm &&
                  isNickName &&
                  isRealName &&
                  isStudentId
                    ? 'bg-mainYellow hover:bg-pointYellow'
                    : 'bg-divisionGray dark:bg-darkPoint'
                }`}
              >
                회원가입
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
      <MessageModal ref={sendSuccessModalRef}>
        <span className="font-bold">{emailAddress}</span>로 인증 메일을
        발송하였습니다.
      </MessageModal>
      <MessageModal ref={sendFailModalRef}>
        인증 메일 발송에 실패하였습니다.
      </MessageModal>
      <MessageModal ref={signUpSuccessModalRef} link={'/signin'}>
        회원가입이 완료되었습니다.
      </MessageModal>
      <MessageModal ref={signUpFailModalRef}>
        회원가입에 실패하였습니다.
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
