import React from 'react';
import MyPageFrame from './Components/Frames/MyPageFrame';

const dummyItemHeads = ['test1', 'test2', 'test3'];
const dummyItems = [
  { test1: '1', test2: 2, test3: 3.0 },
  { test1: '4', test2: 5, test3: 6.0 },
  { test1: '7', test2: 8, test3: 9.0 },
];

const Clipping = () => {
  return <MyPageFrame items={dummyItems} itemHeads={dummyItemHeads} />;
};

export default Clipping;
