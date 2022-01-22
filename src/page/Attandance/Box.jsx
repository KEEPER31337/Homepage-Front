import React from 'react';

const Box = ({ icon, text }) => {
  return (
    <div className="bg-white border-divisionGray w-36 h-auto m- rounded-lg shadow-lg p-2">
      <div className="m-2">
        <img src={icon} className="w-3/4 m-auto" />
      </div>
      <div className="m-auto text-center text-lg font-bold ">{text}</div>
    </div>
  );
};

export default Box;
