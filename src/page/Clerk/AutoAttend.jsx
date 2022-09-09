import AuthUser from 'shared/AuthUser';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactCodeInput from 'react-code-input';

//local
import attendAPI from 'API/v1/clerkSeminar';

const AutoAttend = ({member}) => {
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
  const [admitT,setAdmitT] = useState(3);
  const [lateT, setLateT] = useState(5);
  const [startDate, setStartDate] = useState(new Date());
  const [seminarId, setSeminarId] = useState(0);
  const [startTime, setStartTime] = useState('');
  const jobs = member?.memberInfo?.jobs;
  //const token = state.member.token;
  localStorage.removeItem("code"); //local에 저장된 code 값 지우기
  localStorage.removeItem("min");
  localStorage.removeItem("sec");
  useEffect(() => {
    if (jobs?.some((i) => auth.includes(i))) {
      setBoss(true);
    }
  }, []);

  const onSubmit = (event) => {
    
    event.preventDefault();
  }
  const admitChange = (event) => {
    setAdmitT(event.target.value);
  }
  const lateChange = (event) => {
    setLateT(event.target.value);
  }
  setStartDate(new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')); 
  console.log(startDate)
  console.log(startDate.getMinutes())
  const loadSeminarByDate = () => { //API요청값 맞춰 날짜 포맷 변환
    let resDate = '';
    const date = [startDate.getFullYear(),startDate.getMonth(),startDate.getDate()]
    setStartDate(new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '')); 
    
    const reformatDate = date.map((date) => {
      if (parseInt(date)<10) date = '0' + date;
      resDate = resDate + date; 
    });
    attendAPI
      .getSeminarByDate({
          searchDate: resDate,
          token: token,
    })
    attendAPI
      .createSeminar({
        openTime: startDate,
      })
      .then((res) => {
        console.log(res.msg);
        if(res.success) {
          setSeminarId(res.data.id);
          console.log(res.data.id);
        }
      })



  }
  return (
    <AuthUser>
      {/* AuthUser : 로그인이 안 되어있을 때, 또는 로그인 만료가 되었을 때 
      로그인 페이지로 가게 하는 컴포넌트 */}
      <div className="flex flex-1 justify-center">
        <div className="w-full">
          {
            boss ?
            <div className="w-2/5 mx-auto">
              <div className="mt-32 text-xl font-bold text-center text-violet-300 inline-flex">
                <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                dateFormat="yyyy/MM/dd 회차 세미나"
                />               
              </div>
              <div className="my-5 py-5 border-2 border-violet-200 rounded-2xl">     
                <form onSubmit={onSubmit} className="flex flex-col w-2/3 m-auto space-y-3 text-violet-400 text-center">
                  <span className="space-x-3 space-y-2">
                    <label className="">◆ 출석 인정 시간 ◆</label>
                    <select onChange={admitChange} className="bg-violet-50 border border-violet-200 text-violet-400 font-bold rounded-lg
                    focus:ring-violet-500 focus:border-violet-200 py-1.5 text-center" >
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
                      type="submit"
                      className="w-full mt-4 px-4 py-2 bg-violet-200 leading-6 rounded-md border border-transparent text-white focus:outline-none 
                      hover:bg-violet-300 items-center w-full justify-center items-center font-bold focus:outline-none"
                      onClick={loadSeminarByDate}
                  >
                    <Link 
                      to ="/startAttend" 
                      className="links"
                      state={{
                        admitT: admitT,
                        lateT: lateT,
                      }}
                    >
                      출석시작
                    </Link>
                  </button>
                </form>
              </div>              
            </div>
 :
            <div className="container mx-auto p-4 bg-white">
              <div className="flex flex-1 justify-center w-full">
                <div className="w-3/4 mt-32 font-bold text-center text-violet-300 space-y-8">
                  <label className="py-2 px-6 bg-violet-300 text-white text-lg rounded-3xl">코드를 입력하세요</label><br/>
                  <form class="flex flex-col mt-4">
                    <ReactCodeInput readOnly value="" type="text" fields={4} {...props} />
                    <button
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
         
          {/* 여기서 작업하면 됩니당~!~! */}
        </div>
      </div> 
    </AuthUser>
    
  );
};


const mapStateToProps = (state) => {
  return { member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoAttend);
