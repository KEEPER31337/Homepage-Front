import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AuthUser from 'shared/AuthUser';
import ReactCodeInput from 'react-code-input';

//local
import attendAPI from 'API/v1/clerk';
import attendance from 'API/v1/attendance';

//출석 시작 버튼을 눌렀을 때 뜨는 페이지
const DoAttend = ({ member, state }) => {
  const props = {
    inputStyle: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield',
      width: '35px',
      borderRadius: '3px',
      fontSize: '20px',
      height: '35px',
      paddingLeft: '7px',
      backgroundColor: 'white',
      color: '#d6bcfa',
      border: '1px solid #d6bcfa',
      textAlign: 'center',
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield',
      width: '15px',
      borderRadius: '3px',
      fontSize: '14px',
      height: '26px',
      paddingLeft: '7px',
      backgroundColor: 'white',
      color: 'red',
      border: '2px solid red',
    },
  };
  const location = useLocation(); //location.state로 인자값 받아옴
  const token = state.member.token;
  const [today, setToday] = useState(location.state.currentTime.toString()); //바로 currnetT 스테이트 가져옴
  const [inputCode, setInputCode] = useState('');
  const [seminarId, setSeminarId] = useState();
  const [attendance, setAttendance] = useState(false);
  useEffect(() => {
    attendAPI
      .getSeminar({
        searchDate: today.substr(0, 10),
        token: token,
      })
      .then((res) => {
        //console.log(res);
        if (res.success) {
          //console.log(res.msg);
          setSeminarId(res.data.seminarId);
        } else alert('목록을 불러오는데 실패했습니다.');
      });
  }, []);

  const CodeInput = (event) => {
    //console.log(event);
    setInputCode(event);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(inputCode, seminarId);
    attendAPI
      .AttendSeminar({
        token: token,
        seminarId: seminarId,
        attendanceCode: inputCode,
      })
      .then((res) => {
        if (res.success) {
          if (res.data.isPossibleAttendance) {
            alert(res.data.attendanceStatus);
            setAttendance(true);
          } else alert('세미나 출석이 종료되었습니다.');
        }
      });
  };

  return (
    <AuthUser>
      <div className="min-h-screen dark:bg-black">
        <div className="container mx-auto p-4 bg-white dark:bg-black">
          <div className="flex flex-1 justify-center w-full ">
            <div className="w-3/4 mt-32 font-bold text-center text-violet-300 space-y-8">
              {attendance ? (
                <div> 출석완료 </div>
              ) : (
                <>
                  <label className="py-2 px-6 bg-violet-300 text-white text-lg rounded-3xl dark:text-black">
                    코드를 입력하세요
                  </label>
                  <br />
                  <form className="flex flex-col mt-4">
                    <ReactCodeInput
                      onChange={CodeInput}
                      value=""
                      type="text"
                      fields={4}
                      {...props}
                    />
                    <button
                      onClick={onSubmit}
                      className="w-1/4 mx-auto mt-8 px-4 py-2 bg-violet-200 leading-6 rounded-md border border-transparent text-white focus:outline-none 
                          hover:bg-violet-300 items-center w-full justify-center items-center font-bold focus:outline-none dark:text-black"
                    >
                      출석
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthUser>
  );
};

const mapStateToProps = (state) => {
  return { member: state.member, state: state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoAttend);
