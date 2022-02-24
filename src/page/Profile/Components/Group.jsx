import React from 'react';

const groups = {
  ROLE_회원: { name: '회원', img: '' },
  일반회원: { name: '일반회원', img: '' },
  비회원: { name: '비회원', img: '' },
};

export default function Group(props) {
  const group = groups[props.groupName];
  return (
    <div>
      <img className="h-9 object-cover float-left w-9" src={group.img} />
    </div>
  );
}
