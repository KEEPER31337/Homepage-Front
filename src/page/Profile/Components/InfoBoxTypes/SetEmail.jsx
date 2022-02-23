import React, { useState } from 'react';
import { useEffect } from 'react';

//local
import authAPI from 'API/v1/auth';
import memberAPI from 'API/v1/member';
import { connect } from 'react-redux';

function SetEmail({ member }) {
  const [email, setEmail] = useState('');
  const [passEmail, setPassEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState({
    text: '이메일을 입력해주세요',
    color: 'mainBlack',
    dark: 'mainWhite',
  });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [code, setCode] = useState('');
  const [codeMsg, setCodeMsg] = useState({
    text: '',
    color: 'mainBlack',
    dark: 'mainWhite',
  });
  const [isChanging, setIsChanging] = useState(false);

  const checkEmail = () => {
    const emailAddressRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailAddressRegex.test(email);
  };

  const submitEmail = () => {
    setIsSendingCode(true);
    authAPI.emailCheck({ emailAddress: email }).then((emailCheckResult) => {
      if (!emailCheckResult.success) {
        setEmailMsg({
          text: `${emailCheckResult.code}:${emailCheckResult.msg}`,
          color: 'red-500',
          dark: 'red-500',
        });
      } else if (emailCheckResult.data) {
        setEmailMsg({
          text: '이미 존재하는 이메일입니다.',
          color: 'red-500',
          dark: 'red-500',
        });
      } else {
        const emailAuthResult = await authAPI.emailAuth({
          emailAddress: email,
        });
        //NOTE 이게 api결과를 받는데까지 시간이 걸리기때문에, 일단 보냈음을 메시지로 출력해줘야한대요!
        setEmailMsg({
          text: '해당 메일로 인증코드를 보냈습니다.',
          color: 'mainBlack',
          dark: 'mainWhite',
        });

        if (!emailAuthResult.success) {
          setEmailMsg({
            text: `${emailAuthResult.code}:알 수 없는 오류입니다`,
            color: 'red-500',
            darK: 'red-500',
          });
        } else {
          setEmailMsg({
            text: '코드가 성공적으로 전송되었습니다',
            color: 'mainBlack',
            dark: 'mainWhite',
          });
          setCodeMsg({
            text: '코드를 입력해주세요',
            color: 'mainBlack',
            dark: 'mainWhite',
          });
        }
      }
    });
    setIsSendingCode(false);
  };

  const changeEmail = () => {
    console.log(email, code);
    setIsChanging(true);

    memberAPI
      .updateEmail({
        emailAddress: email,
        authCode: code,
        token: member.token,
      })
      .then((data) => {
        console.log(data);
        if (!data.success) {
          //실패했을 경우
          setCodeMsg({
            text: `${data.code}:${data.msg}`,
            color: 'red-500',
            darK: 'red-500',
          });
        } else {
          setCodeMsg({
            text: '이메일이 성공적으로 변경되었습니다',
            color: 'mainBlack',
            dark: 'mainWhite',
          });
          setEmail('');
          setCode('');
        }
        setIsChanging(false);
      });
  };

  useEffect(() => {
    if (checkEmail()) {
      setPassEmail(true);
      setEmailMsg({
        text: '올바른 이메일 입니다',
        color: 'mainBlack',
        dark: 'mainWhite',
      });
    } else if (email == '') {
      setPassEmail(false);
      setEmailMsg({
        text: '이메일을 입력해주세요',
        color: 'mainBlack',
        dark: 'mainWhite',
      });
    } else {
      setPassEmail(false);
      setEmailMsg({
        text: '이메일 형식이 아닙니다',
        color: 'red-500',
        dark: 'red-500',
      });
    }
  }, [email]);

  return (
    <div className="px-10">
      <div className="py-5 text-xl text-mainYellow font-bold">이메일 변경</div>
      <div className="flex justify-center">
        <div className="flex-col w-2/5 mr-auto">
          <div className="w-full pl-3 text-mainBlack dark:text-mainWhite">
            email
          </div>
          <div className="w-full h-10 rounded-xl">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-mainWhite dark:bg-darkPoint 
                        rounded-xl rounded-r-none border-0 
                        w-5/6 h-full px-3 focus:ring-transparent
                        text-mainBlack dark:text-mainWhite"
            />
            <button
              disabled={isSendingCode || !passEmail}
              onClick={submitEmail}
              className="bg-mainYellow rounded-xl rounded-l-none h-full w-1/6 hover:bg-pointYellow"
            >
              sub
            </button>
          </div>
          <div
            className={`w-full pl-3 text-${emailMsg.color} dark:text-${emailMsg.dark}`}
          >
            {emailMsg.text}
          </div>
        </div>
        <div className="flex-col w-2/5 ml-auto">
          <div className="w-full pl-3 text-mainBlack dark:text-mainWhite">
            code
          </div>
          <div className="w-full h-10 rounded-xl">
            <input
              id="code"
              name="code"
              required
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="bg-mainWhite dark:bg-darkPoint 
                        rounded-xl rounded-r-none border-0 
                        w-5/6 h-full px-3 focus:outline-none
                        text-mainBlack dark:text-mainWhite"
            />
            <button
              disabled={isChanging || !passEmail}
              onClick={changeEmail}
              className="bg-mainYellow rounded-xl rounded-l-none h-full w-1/6 hover:bg-pointYellow"
            >
              sub
            </button>
          </div>
          <div
            className={`w-full pl-3 text-${codeMsg.color} dark:text-${codeMsg.dark}`}
          >
            {codeMsg.text}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(SetEmail);
