import React, { useState, useEffect, useRef } from 'react';
//카운트다운

const Countdown = (props) => {
    const startT = props.startT;
    const lateT = props.lateT;
    const admitT = props.admitT;
    const [time, setTime] = useState(new Date());
    const [timediff,setTimediff] = useState(0);
    const [currentT,setCurrentT] = useState(new Date(admitT));
    const [admitNotOver,setANO] = useState(true);
    const id = useRef(null);
    
    useEffect(() => {
        //console.log((new Date(new Date(new Date(lateT)-time)).toISOString().replace("T", " ").replace(/\..*/, '').substr(14,)))     
        setTimediff((new Date(new Date(currentT-time)).toISOString().replace("T", " ").replace(/\..*/, '').substr(14,)));
        if (timediff=="00:01") {
            if(admitNotOver) {
                setCurrentT(new Date(lateT));
                setANO(false);
            }
            else {
                clearInterval(id.current);}
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
                admitNotOver ?
                <div>
                    <div>출석: {timediff}</div>
                    <div>지각: {(new Date(new Date(new Date(lateT)-new Date(admitT))).toISOString().replace("T", " ").replace(/\..*/, '').substr(14,))}</div>
                </div>
    :
                <div>
                    <div>출석: 0:00</div>
                    <div>지각: {timediff}</div>
                </div>
            }
        </div>
    );
}

export default Countdown;