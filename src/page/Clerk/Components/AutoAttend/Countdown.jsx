import React, { useState, useEffect } from 'react';
//카운트다운

const Countdown = (props) => {
    const [lateT,setLateT] = useState(props.lateT)
    const [admitT,setAdmitT] = useState(props.admitT)
    const [minutes,setMinutes] = useState(localStorage.getItem("min"));
    const [seconds,setSeconds] = useState(localStorage.getItem("sec"));

    useEffect(() => {
        const countdown = setInterval(() => {
          if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
            localStorage.setItem("sec",seconds);
          }
          if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
                if (parseInt(admitT)=== 0) {
                    clearInterval(countdown); 
                }
                else {
                    setAdmitT(0); 
                    setMinutes(lateT);
                    localStorage.setItem("min",minutes);
                }
            } else {
              setMinutes(parseInt(minutes) - 1);
              localStorage.setItem("min",minutes);
              setSeconds(59);
              localStorage.setItem("sec",seconds);
            }
          }
        }, 1000);
        return () => clearInterval(countdown);
    }, [seconds, minutes, admitT]);

    return (
        <div className="flex flex-1 justify-center w-full">
            {
            admitT ?
            <div>
                <div>출석: {localStorage.getItem("min")}:{localStorage.getItem("sec") < 10 ? `0${localStorage.getItem("sec")}` : localStorage.getItem("sec") }</div>
                <div>지각: {lateT}:00</div>
            </div>
 :
            <div>
                <div>출석: 0:00</div>
                <div>지각: {localStorage.getItem("min")}:{localStorage.getItem("sec") < 10 ? `0${localStorage.getItem("sec")}` : localStorage.getItem("sec") }</div>
            </div>
          }
        </div>
    );
}


export default Countdown;