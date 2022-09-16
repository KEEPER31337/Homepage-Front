import { useState,useEffect } from "react";
import Countdown from "./Countdown";

import { connect } from 'react-redux';
import { useLocation } from "react-router-dom"
//local
import attendAPI from 'API/v1/clerk';
import AuthUser from "shared/AuthUser";
import ReactCodeInput from 'react-code-input';

//출석 시작 버튼을 눌렀을 때 뜨는 페이지
const StartAttend = ({member, state}) => {
  const props = {
    inputStyle: {
      fontFamily: 'monospace',
      margin:  '4px',
      MozAppearance: 'textfield',
      width: '35px',
      borderRadius: '3px',
      fontSize: '20px',
      height: '35px',
      paddingLeft: '7px',
      backgroundColor: 'white',
      color: '#d6bcfa',
      border: '1px solid #d6bcfa',
      textAlign: 'center'
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      margin:  '4px',
      MozAppearance: 'textfield',
      width: '15px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
      paddingLeft: '7px',
      backgroundColor: 'white',
      color: 'red',   
      border: '2px solid red'
    }
  }
  const [auth, setAuth] = useState(['ROLE_회장']);
  const [boss,setBoss] = useState(false); 
  const location = useLocation(); //location.state로 인자값 받아옴
  const [attendanceCloseTime,setACT] = useState(location.state.attendanceCloseTime);
  const [latenessCloseTime,setLCT] = useState(location.state.latenessCloseTime);
  const [code,setCode] = useState(location.state.code);
  const [inputCode, setInputCode] = useState('');
  const [currentTime, setCT] = useState(location.state.currentTime);
  const token = state.member.token;
  const jobs = member?.memberInfo?.jobs;
  useEffect(() => {
    if (jobs?.some((i) => auth.includes(i))) {
      setBoss(true);
    }
  }, []);

  const CodeInput = (event) => {
    setInputCode(event.target.value);
  }
  const compareCode = (event) => {
    if (code == inputCode) console.log("맞음");
    else alert("틀림");
  }

    return (
      <AuthUser>
        <div className="flex flex-1 justify-center w-full">
          {
            boss ?
              <div className="w-3/4 mx-auto mt-32 text-xl font-bold text-center text-violet-300 space-y-8">
                <label className="py-2 px-6 bg-violet-300 text-white rounded-3xl">인증코드</label><br/>
                <div className="text-4xl">{code}</div><hr/>
              <Countdown startT = {currentTime} admitT={attendanceCloseTime} lateT={latenessCloseTime} className=""/>
            </div>
            :
            <div className="container mx-auto p-4 bg-white">
            <div className="flex flex-1 justify-center w-full">
              <div className="w-3/4 mt-32 font-bold text-center text-violet-300 space-y-8">
                <label className="py-2 px-6 bg-violet-300 text-white text-lg rounded-3xl">코드를 입력하세요</label><br/>
                <form class="flex flex-col mt-4">
                  <ReactCodeInput onChange={CodeInput} value="" type="text" fields={4} {...props} />
                  <button
                      onSubmit={compareCode}
                      type="submit"
                      className="w-1/4 mx-auto mt-8 px-4 py-2 bg-violet-200 leading-6 rounded-md border border-transparent text-white focus:outline-none 
                      hover:bg-violet-300 items-center w-full justify-center items-center font-bold focus:outline-none"
                  >
                    출석
                  </button>
                </form>
              </div>
            </div>
          </div>
          }

        </div>
      </AuthUser>

  );
};


const mapStateToProps = (state) => {
  return { member: state.member, state:state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartAttend);