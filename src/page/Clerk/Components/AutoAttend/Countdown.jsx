import React, { useState, useEffect } from 'react';
//카운트다운

const Countdown = (props) => {
    const [minute,setminute] = useState(0);
    const [seconds,setseconds] = useState(props.minutes);
    const [lateT,setLateT] = useState(props.lateT)
    const [admitT,setAdmitT] = useState(props.admitT)
    useEffect(() => {
        const countdown = setInterval(() => {
          if (parseInt(seconds) > 0) {
            setseconds(parseInt(seconds) - 1);
          }
          if (parseInt(seconds) === 0) {
            if (parseInt(minute) === 0) {
                if (parseInt(admitT)=== 0) {
                    clearInterval(countdown); 
                }
                else {
                    setAdmitT(0); 
                    setminute(lateT);
                }
            } else {
              setminute(parseInt(minute) - 1);
              setseconds(59);
            }
          }
        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds, minute, admitT]);

    return (
        <div className="flex flex-1 justify-center w-full">
            {
            admitT ?
            <div>
                <div>출석: {minute}:{seconds < 10 ? `0${seconds}` : seconds }</div>
                <div>지각: {lateT}:00</div>
            </div>
 :
            <div>
                <div>출석: 0:00</div>
                <div>지각: {minute}:{seconds < 10 ? `0${seconds}` : seconds }</div>
            </div>
          }
        </div>
    );
}


export default Countdown;