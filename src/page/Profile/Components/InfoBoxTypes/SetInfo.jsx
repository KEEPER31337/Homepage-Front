import React, { useState } from 'react';
import { useEffect } from 'react';

//local
import memberAPI from 'API/v1/member';
import { connect } from 'react-redux';

function SetInfo({ member, memberInfo, infoState }) {
  const [msg, setMsg] = useState({
    text: '변경사항이 저장되지 않았습니다',
    color: 'mainBlack',
    dark: 'mainWhite',
  });

  const [name, setName] = useState(memberInfo.name || '');
  const [nickName, setNickName] = useState(memberInfo.nickName || '');
  const [studentId, setStudentId] = useState(memberInfo.studentId || '');

  const [isChanging, setIsChanging] = useState(false);

  const [info, setInfo] = infoState;

  const editInputs = [
    //{ title: '이름', state: name, setState: setName, id: 'name' },
    { title: '닉네임', state: nickName, setState: setNickName, id: 'nickName' },
    {
      title: '학번',
      state: studentId,
      setState: setStudentId,
      id: 'studentId',
    },
  ];

  const changeInfo = () => {
    setIsChanging(true);

    memberAPI
      .updateProfile({
        realName: name,
        nickName: nickName,
        studentId: studentId,
        token: member.token,
      })
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
            text: '변경사항이 성공적으로 저장되었습니다.',
            color: 'mainBlack',
            dark: 'mainWhite',
          });
          info.nickName = nickName;
          setInfo(info);
        }
        setIsChanging(false);
      });
  };

  useEffect(() => {
    setMsg({
      text: '변경사항이 저장되지 않았습니다',
      color: 'mainBlack',
      dark: 'mainWhite',
    });
  }, [name, nickName, studentId]);

  const renderInput = (input) => {
    return (
      <div className="flex-col w-[30%] mr-auto">
        <div className="w-full pl-3 text-mainBlack dark:text-mainWhite">
          {input.title}
        </div>
        <div className="w-full h-10 rounded-xl">
          <input
            id={input.id}
            name={input.id}
            required
            value={input.state}
            onChange={(event) => input.setState(event.target.value)}
            className="bg-mainWhite dark:bg-darkPoint 
                        rounded-xl border-0 w-5/6 h-full 
                        px-3 focus:outline-none
                        text-mainBlack dark:text-mainWhite"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="px-10">
      <div className="flex justify-start pt-5">
        <div className="mr-auto">
          <div className="text-xl text-mainYellow font-bold">
            프로필 정보 변경
          </div>
          <div
            className={`text-${msg.color} dark:text-${msg.dark} text-sm min-h-[1.5rem]`}
          >
            {msg.text}
          </div>
        </div>
        <button
          onClick={changeInfo}
          disabled={isChanging}
          className="bg-mainYellow hover:bg-pointYellow 
                      ml-auto w-16 h-10 rounded-xl"
        >
          변경
        </button>
      </div>
      <div className="flex justify-center py-10">
        {editInputs.map((input) => renderInput(input))}
      </div>
    </div>
  );
}

const mapStateToProps = (state, OwnProps) => {
  return { member: state.member };
};

export default connect(mapStateToProps)(SetInfo);
