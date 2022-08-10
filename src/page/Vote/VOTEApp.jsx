import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthUser from 'shared/AuthUser';

import VOTEHeader from 'page/Vote/Components/VOTEHeader';
const Vote = lazy(() => import('page/Vote/Vote'));
const ScoreBoard = lazy(() => import('page/Vote/ScoreBoard'));
const MyPick = lazy(() => import('page/Vote/MyPick'));
const Operation = lazy(() => import('page/Vote/admin/Operation'));
const Submissions = lazy(() => import('page/Vote/admin/Submissions'));
const RevisePeople = lazy(() =>
  import('page/Vote/Components/Submissions/RevisePeople')
);

const VOTEApp = () => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-row">
        <VOTEHeader />
        <Routes>
          <Route path="/" element={<Vote />} />
          <Route path="/scoreboard" element={<ScoreBoard />} />
          <Route path="/mypick" element={<MyPick />} />
          <Route path="/admin/operation" element={<Operation />} />
          <Route path="/admin/submissions" element={<Submissions />} />
          <Route path="/admin/submissions/revise" element={<RevisePeople />} />
        </Routes>
      </div>
    </div>
  );
};

export default VOTEApp;
