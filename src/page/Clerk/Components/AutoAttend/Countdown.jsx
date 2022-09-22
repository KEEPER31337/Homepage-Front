import React, { useState, useEffect, useRef } from 'react';


//카운트다운

const Countdown = (props) => {
    const lateT = props.lateT; //지각 인정 종료시각
    const admitT = props.admitT; //출석 인정 종료시각
    const [time, setTime] = useState(new Date()); //남은 인정 시간 구하기 위한 현재 시각
    const [timediff,setTimediff] = useState(0); //남은 인정시간
    const id = useRef(null);

    useEffect(() => {
        if ((new Date(new Date(new Date(admitT)-time))).getTime() >= 0) {
          setTimediff((new Date(new Date(new Date(admitT)-time)).toISOString().replace("T", " ").replace(/\..*/, '').substr(14,)));  
          //if(timediff == "00:01")
           // console.log("admit over");            
        }
        else {
            setTimediff((new Date(new Date(new Date(lateT)-time)).toISOString().replace("T", " ").replace(/\..*/, '').substr(14,)));
            if(timediff == "00:01" || (new Date(new Date(new Date(lateT)-time))).getTime() <= 0) {
                clearInterval(id.current);
                //console.log("attend over");
            }
        }
    }, [time]);


    useEffect(() => {
        id.current = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return (() => clearInterval(id.current))
      }, []); 

    return (
        <div className="flex flex-1 justify-center w-full">
            {
                (new Date(new Date(new Date(admitT)-time))).getTime() > 0 ? //아직 인정시간일 때
                <div>
                    <div>출석: {timediff}</div>
                    <div>지각: {(new Date(new Date(new Date(lateT)-new Date(admitT))).toISOString().replace("T", " ").replace(/\..*/, '').substr(14,))}</div>
                </div>
    :
                <div>
                    <div>출석: 00:00</div>
                    <div>지각: {timediff}</div>
                </div>
            }
        </div>
    );
}

export default Countdown;