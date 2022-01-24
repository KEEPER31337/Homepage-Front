import React from 'react';

export default function Group(props) {
  return (
    <div className="w-full h-1/3">
      <img
        className="p-1 h-full object-cover float-left"
        src={props.group.img}
      />
      <div className="pl-5 pt-1 text-center float-left text-xl">
        {props.group.name}
      </div>
    </div>
  );
}
