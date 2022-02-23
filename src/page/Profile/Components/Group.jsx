import React from 'react';

const groups = {
  ROLE_회원: { name: '회원', img: '' },
  일반회원: { name: '일반회원', img: '' },
  비회원: { name: '비회원', img: '' },
};

export default function Group(props) {
  const group = groups[props.groupName];
  return (
    <div className="w-full h-1/3">
      <img
        className="p-1 h-full object-cover float-left w-11"
        src={group.img}
      />
      <div className="pl-5 pt-1 text-center float-left text-xl">
        {group.name}
      </div>
    </div>
  );
}
