import { useState,useEffect } from "react";
import Countdown from "./Countdown";
import { useLocation } from "react-router-dom"

//출석 시작 버튼을 눌렀을 때 뜨는 페이지
const StartAttend = () => {
    

    const location = useLocation(); //location.state로 인자값 받아옴
    const [admitT,setAdmitT] = useState(location.state.admitT);
    const [lateT,setLateT] = useState(location.state.lateT);
    const [code,setCode] = useState('');
    const makeCode = () => {
        let str = ''
        for (let i = 0; i < 4; i++) {
          str += Math.floor(Math.random() * 10)
        }
        setCode(str)
      }
    useEffect(() => {
        makeCode();
      }, []);
    console.log(code);
    return (
        <div className="flex flex-1 justify-center w-full">
            <div className="w-3/4 mx-auto mt-32 text-xl font-bold text-center text-violet-300 space-y-8">
                <label className="py-2 px-6 bg-violet-300 text-white rounded-3xl">인증코드</label><br/>
                <div className="text-4xl">{code}</div><hr/>
                <Countdown minutes={admitT} admitT={admitT} lateT={lateT} className=""/>
            </div>
        </div>
    );
};

export default StartAttend;