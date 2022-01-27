import React from 'react';

export default function CircularGauge(props) {
  const dia = props.inRad * 2 * Math.PI;
  return (
    <div className="w-full h-full">
      <svg className="absolute transform --rotate-90 w-[100px] h-[63px]">
        <circle
          className="text-divisionGray"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={props.inRad}
          cx={props.outRad}
          cy={props.outRad}
        />
        <circle
          className="text-mainYellow"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={dia}
          strokeDashoffset={dia * (1 - props.parcent)}
          r={props.inRad}
          cx={props.outRad}
          cy={props.outRad}
        />
      </svg>
      <div className="p-2.5 absolute text-center object-cover text-mainYellow text-lg">
        {props.text}
      </div>
    </div>
  );
}
