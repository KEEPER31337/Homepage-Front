import React from 'react';
import MyPageFrame from './Components/Frames/MyPageFrame';

const itemHeads = ['번호', '닉네임'];

const Followers = () => {
  const items = [];
  return <MyPageFrame items={items} itemHeads={itemHeads} />;
};

export default Followers;
