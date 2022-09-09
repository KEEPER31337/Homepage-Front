import { useState,useEffect } from "react";
import Countdown from "./Countdown";

import { connect } from 'react-redux';
import { useLocation } from "react-router-dom"
//local
import attendAPI from 'API/v1/clerk';

//출석 시작 버튼을 눌렀을 때 뜨는 페이지
const StartAttend = ({member, state}) => {
    
    const location = useLocation(); //location.state로 인자값 받아옴
    const [admitT,setAdmitT] = useState(location.state.admitT);
    const [lateT,setLateT] = useState(location.state.lateT);
    const [startDate,setStartDate] = useState(location.state.startDate);
    const [code,setCode] = useState('');
    const date = [startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate()]
    const token = state.member.token;
    const jobs = member?.memberInfo?.jobs;
    let reformatedDate = '';
    const reformatDate = date.map((date) => {
      if (parseInt(date)<10) date = '0' + date;
      reformatedDate = reformatedDate + date; 
    });
    console.log("시작시간:",reformatedDate);

    useEffect(() => {
      
    },[]);


    //const [code,setCode] = useState(localStorage.getItem("code"));
    // localStorage.setItem("min",admitT);
    // localStorage.setItem("sec",0);

    // const makeCode = () => {
    //     let str = ''
    //     for (let i = 0; i < 4; i++) {
    //       str += Math.floor(Math.random() * 10)
    //     }
    //     setCode(str)
    //   }
    // useEffect(() => { 
    //     makeCode();
    //     const codeSaved = localStorage.getItem("code"); //새로고침 시에도 코드 값 유지
    //     if (codeSaved != "null") {
    //       setCode(codeSaved);
    //     }
    //   }, []);
    // localStorage.setItem("code",code);
    // console.log(code);

    return (
        <div className="flex flex-1 justify-center w-full">
            <div className="w-3/4 mx-auto mt-32 text-xl font-bold text-center text-violet-300 space-y-8">
                <label className="py-2 px-6 bg-violet-300 text-white rounded-3xl">인증코드</label><br/>
                <div className="text-4xl">{code}</div><hr/>
                <Countdown admitT={admitT} lateT={lateT} className=""/>
            </div>
        </div>
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