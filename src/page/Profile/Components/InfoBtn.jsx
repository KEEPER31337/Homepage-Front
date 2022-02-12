import React from 'react';

export default function InfoBtn(props) {
  return (
    <button
      className="bg-divisionGray dark:bg-darkComponent rounded-2xl ml-3 w-[28%] h-full p-1 hover:bg-[#c0c0c0] dark:hover:bg-[#3f4957] float-left"
      onClick={props.btn.onClick}
    >
      <div className="text-center dark:text-mainWhite text-xs">
        {props.btn.text}
      </div>
    </button>
  );
}
