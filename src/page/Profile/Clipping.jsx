import React from 'react';
import MyPageFrame from './Components/Frames/MyPageFrame';

const itemHeads = ['번호', '제목', '글쓴이', '날짜'];

const Clipping = () => {
  const items = [];
  return <MyPageFrame items={items} itemHeads={itemHeads} />;
};

export default Clipping;
