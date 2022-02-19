import React from 'react';

const Box = ({ icon, text, ...rest }) => {
  return (
    <div
      className="w-36 h-auto justify-center rounded-lg shadow-lg p-2 cursor-point bg-white hover:bg-green-50 dark:bg-darkComponent dark:hover:bg-teal-800"
      {...rest}
    >
      <div className="m-2">
        <img src={icon} className="w-3/4 m-auto" />
      </div>
      <div className="m-auto text-center text-lg font-bold ">{text}</div>
    </div>
  );
};

export default Box;
