import React from 'react';

export default function InfoBox(props) {
  return (
    <div className="w-1/2 h-1/2 p-10 float-left">
      <div className="bg-divisionGray rounded-2xl w-full h-full">
        {props.children}
      </div>
    </div>
  );
}
