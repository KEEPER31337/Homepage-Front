import React from 'react';

export default function InfoRouteBtn(props) {
  return (
    <button className="bg-divisionGray dark:bg-darkComponent rounded-2xl mx-auto w-1/4 h-full p-1 hover:bg-[#c0c0c0] dark:hover:bg-[#3f4957] float-left">
      <div className="text-center dark:text-mainWhite text-xs">
        {props.text}
      </div>
    </button>
  );
}
