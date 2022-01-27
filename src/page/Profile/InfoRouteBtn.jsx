import React from 'react';

export default function InfoRouteBtn(props) {
  return (
    <button className="bg-divisionGray rounded-2xl w-1/4 h-full p-3 mr-4 hover:bg-[#c0c0c0] float-left">
      <img className="w-full h-full object-cover" src={props.img} />
    </button>
  );
}
