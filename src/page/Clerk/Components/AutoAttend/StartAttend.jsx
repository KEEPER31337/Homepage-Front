import { useState,useEffect } from "react";
import Countdown from "./Countdown";

import { connect } from 'react-redux';
import { useLocation } from "react-router-dom"

//local
import AuthUser from "shared/AuthUser";

//출석 시작 버튼을 눌렀을 때 뜨는 페이지
const StartAttend = ({member, state}) => {

  const [auth, setAuth] = useState(['ROLE_회장']);
  const [boss,setBoss] = useState(false); 
  const location = useLocation(); //location.state로 인자값 받아옴
  const [attendanceCloseTime,setACT] = useState(location.state.attendanceCloseTime);
  const [latenessCloseTime,setLCT] = useState(location.state.latenessCloseTime);
  const [code,setCode] = useState(location.state.code);
  const [seminarId,setSeminarId] = useState(location.state.seminarId);
  const jobs = member?.memberInfo?.jobs;

  useEffect(() => {
    if (jobs?.some((i) => auth.includes(i))) {
      setBoss(true);
    }
  }, []);

    return (
      <AuthUser>
        <div className="flex flex-1 justify-center w-full min-h-screen dark:bg-black">
          {
            boss ?
              <div className="w-3/4 mx-auto mt-32 text-xl font-bold text-center text-violet-300 space-y-8">
                <label className="py-2 px-6 bg-violet-300 text-white rounded-3xl dark:text-black">인증코드</label><br/>
                <div className="text-4xl">{code}</div><hr/>
                <Countdown admitT={attendanceCloseTime} lateT={latenessCloseTime} state={state} seminarId={seminarId} className=""/>
              </div>
            :
            <div>???????</div>
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