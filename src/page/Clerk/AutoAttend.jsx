import AuthUser from 'shared/AuthUser';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from 'react-router-dom';

//local
import attendAPI from 'API/v1/clerk';

const AutoAttend = ({state}) => {
  const [auth, setAuth] = useState(['ROLE_회장']);
  const [boss,setBoss] = useState(false);
  const [admitT,setAdmitT] = useState(1);
  const [lateT, setLateT] = useState(1);
  const [attendanceCloseTime,setACT] = useState(new Date());
  const [latenessCloseTime,setLCT] = useState(new Date());
  const [currentTime,setCT] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [seminarId, setSeminarId] = useState(0);
  const token = state.member.token;
  const jobs = state.member?.memberInfo?.jobs;
  const [code,setCode] = useState('');
  const date = [startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate()]
  
  const getNow = () => {
    return startDate.toISOString().substring(0, 10);
  };
 
  useEffect(() => {
    if (jobs?.some((i) => auth.includes(i))) {
      setBoss(true);
    }
  }, []);

  useEffect(() => { //해당 날짜 세미나 가져오기
    attendAPI
      .getSeminarByDate({
        searchDate: getNow(),
        token: token,
      })
      .then((res) => {
        if (res.success) {
          console.log("조회날짜:",getNow()),
          console.log(res);
          console.log("seminarId:",res.data.seminarId);
          setSeminarId(res.data.seminarId);
        }
        else console.log(res.msg);
      });
  },[startDate]);

  useEffect(() => { //코드바뀌면 페이지 전환됨
    navigate("/startAttend", {state: {latenessCloseTime,attendanceCloseTime,currentTime,seminarId,code}});
  }, [code]);

  const onSubmit = (event) => {
    event.preventDefault();
  }   
  const admitChange = (event) => {
    setAdmitT(event.target.value);
  }
  const lateChange = (event) => {
    setLateT(event.target.value);
  }
  const navigate = useNavigate();
  const loadSeminarByDate = () => { //버튼 누르면 API요청값 맞춰 날짜 포맷 변환
    let resDate = '';
    //지각시간, 출석시간에서 버튼 누른 시간 빼주는 것으로 계산
    let currentT = new Date();
    //offset 안빼주면 다른 시간 뜸 (타임존문제)
    let offset = currentT.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    console.log("버튼 누른 시간: ",new Date(currentT.getTime()-offset).toISOString().replace("T", " ").replace(/\..*/, ''))
    const currentTime = new Date(currentT.getTime()-offset).toISOString().replace("T", " ").replace(/\..*/, '');
    const attendanceCloseTime = new Date(new Date(currentT.getTime()-offset).getTime() + admitT*60000).toISOString().replace("T", " ").replace(/\..*/, '');
    const latenessCloseTime = new Date(new Date(currentT.getTime()-offset).getTime() + admitT*60000 + lateT*60000).toISOString().replace("T", " ").replace(/\..*/, '');
    // console.log("current time:",currentTime); 
    // console.log("attendanceCloseTime:", attendanceCloseTime);
    // console.log("latenessCloseTime:", latenessCloseTime);


    attendAPI
    .startSeminarAttend({
      token: token,
      seminarId: seminarId,
      attendanceCloseTime: attendanceCloseTime,
      latenessCloseTime: latenessCloseTime,
    })
    .then((res) => {
      console.log("code:", res.data.attendanceCode);
      console.log("close time:", res.data.attendanceCloseTime);
      console.log("late time:", res.data.latenessCloseTime);
      setACT(attendanceCloseTime);
      setLCT(latenessCloseTime);
      setCT(currentTime);
      setCode(res.data.attendanceCode);
    })
 

  }
  return (
    <AuthUser>
      {/* AuthUser : 로그인이 안 되어있을 때, 또는 로그인 만료가 되었을 때 
      로그인 페이지로 가게 하는 컴포넌트 */}
      <div className="flex flex-1 justify-center min-h-screen dark:bg-black">
        <div className="w-full ">
          {
            boss ?
            <div className="w-2/5 mx-auto">
              <div className="mt-32 text-xl font-bold text-center text-violet-300 inline-flex">
                <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                dateFormat="yyyy/MM/dd 회차 세미나"
                className="bg-violet-50 border-violet-200 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-700"
                />               
              </div>
              <div className="my-5 py-5 border-2 border-violet-200 rounded-2xl dark:bg-gray-700 dark:border-gray-700">     
                <form onSubmit={onSubmit} className="flex flex-col w-2/3 m-auto space-y-3 text-violet-400 text-center dark:text-white">
                  <span className="space-x-3 space-y-2">
                    <label className="">◆ 출석 인정 시간 ◆</label>
                    <select onChange={admitChange} className="bg-violet-50 border border-violet-200 text-violet-400 font-bold rounded-lg
                    focus:ring-violet-500 focus:border-violet-200 py-1.5 text-center dark:bg-violet-50" >
                      <option value={5}>5분</option>
                      <option value={10}>10분</option>
                      <option value={15}>15분</option>
                      <option value={20}>20분</option>
                    </select> 
                  </span>
                  <span className="space-x-3 space-y-2">
                    <label>◆ 지각 인정 시간 ◆</label>
                    <select onChange={lateChange} className="bg-violet-50 border border-violet-200 text-violet-400 font-bold rounded-lg
                    focus:ring-violet-500 focus:border-violet-200 py-1.5 text-center">
                        <option value={5}>5분</option>
                        <option value={10}>10분</option>
                        <option value={15}>15분</option>
                        <option value={20}>20분</option>
                    </select> 
                  </span>
                    
                      <button
                      className="w-full mt-4 px-4 py-2 bg-violet-200 leading-6 rounded-md border border-transparent text-white focus:outline-none 
                      hover:bg-violet-300 items-center w-full justify-center items-center font-bold focus:outline-none dark: bg-violet-400"
                      onClick={loadSeminarByDate}
                      > 출석시작</button>

                </form>
              </div>              
            </div>
 :
            <div>
              출첵시작전
            </div>
          }
        </div>
      </div> 
    </AuthUser>
    
  );
};


const mapStateToProps = (state) => {
  return { state:state };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoAttend);
