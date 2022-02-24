import React from 'react';

import MyPageFrame from './Components/Frames/MyPageFrame';

const itemHeads = ['번호', '포인트', '사용처'];

const Points = () => {
  const items = [];
  return <MyPageFrame items={items} itemHeads={itemHeads} />;
};

export default Points;
