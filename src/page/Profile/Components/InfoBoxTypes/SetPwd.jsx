import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

//local
import memberAPI from 'API/v1/member';
import { connect } from 'react-redux';

function SetPwd({ member }) {
  const [msg, setMsg] = useState({
    text: '',
    color: 'mainBlack',
    dark: 'mainWhite',
  });

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [pass, setPass] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const checkPwd = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    return passwordRegex.test(password);
  };

  const checkConfirm = () => password == confirm;

  const changePwd = async () => {
    setIsChanging(true);

    // const changePwdResult = await memberAPI.changePassword(token, password);
    memberAPI
      .changePassword({ password: password, token: member.token })
      .then((data) => {
        console.log(data);
        if (!data.success) {
          //실패했을 경우

          setMsg({
            text: `${data.code}:${data.msg}`,
            color: 'red-500',
            dark: 'red-500',
          });
        } else {
          setMsg({
            text: '비밀번호가 성공적으로 변경되었습니다',
            color: 'mainBlack',
            dark: 'mainWhite',
          });

          setPassword('');
          setConfirm('');
        }
        setIsChanging(false);
      });
  };

  useEffect(() => {
    setPass(false);
    if (password == '') {
      setMsg({
        text: '',
        color: 'mainBlack',
        dark: 'mainWhite',
      });
    } else if (!checkPwd()) {
      setMsg({
        text: '8~20자 영문과 숫자를 사용하세요',
        color: 'red-500',
        dark: 'red-500',
      });
    } else if (!checkConfirm()) {
      setMsg({
        text: '비밀번호가 일치하지 않습니다',
        color: 'red-500',
        dark: 'red-500',
      });
    } else {
      setMsg({
        text: '올바른 비밀번호 입니다 변경버튼을 눌러주세요',
        color: 'mainBlack',
        dark: 'mainWhite',
      });
      setPass(true);
    }
  }, [password, confirm]);

  return (
    <div className="px-10">
      <div className="flex justify-start pt-5">
        <div className="mr-auto">
          <div className="text-xl text-mainYellow font-bold">비밀번호 변경</div>
          <div
            className={`text-${msg.color} dark:text-${msg.dark} text-sm min-h-[1.5rem]`}
          >
            {msg.text}
          </div>
        </div>
        <button
          onClick={changePwd}
          disabled={isChanging || !pass}
          className="bg-mainYellow hover:bg-pointYellow 
                      ml-auto w-16 h-10 rounded-xl"
        >
          변경
        </button>
      </div>
      <div className="flex justify-center py-10">
        <div className="flex-col w-2/5 mr-auto">
          <div className="w-full pl-3 text-mainBlack dark:text-mainWhite">
            새로운 비밀번호
          </div>
          <div className="w-full h-10 rounded-xl">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-mainWhite dark:bg-darkPoint 
                        rounded-xl border-0 w-5/6 h-full 
                        px-3 focus:ring-0
                        text-mainBlack dark:text-mainWhite"
            />
          </div>
        </div>
        <div className="flex-col w-2/5 ml-auto">
          <div className="w-full pl-3 text-mainBlack dark:text-mainWhite">
            비밀번호 재입력
          </div>
          <div className="w-full h-10 rounded-xl">
            <input
              type="password"
              id="confirm"
              name="confirm"
              required
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="bg-mainWhite dark:bg-darkPoint 
                        rounded-xl border-0 w-5/6 h-full 
                        px-3 focus:ring-0
                        text-mainBlack dark:text-mainWhite"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(SetPwd);
