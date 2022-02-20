import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Clipping from '../Clipping';
import Drafts from '../Drafts';
import Followers from '../Followers';
import Follows from '../Follows';
import Points from '../Points';
import Posts from '../Posts';

const MyPageRoute = () => {
  return (
    <>
      <Routes>
        <Route exact path="clipping" element={<Clipping />} />
        <Route exact path="drafts" element={<Drafts />} />
        <Route exact path="posts" element={<Posts />} />
        <Route exact path="followers" element={<Followers />} />
        <Route exact path="follows" element={<Follows />} />
        <Route exact path="points" element={<Points />} />
      </Routes>
    </>
  );
};

export default MyPageRoute;
