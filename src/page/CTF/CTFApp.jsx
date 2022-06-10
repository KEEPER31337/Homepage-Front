import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthUser from 'shared/AuthUser';
import CTFHeader from 'page/CTF/Components/NavigationLayout';
const ChallengeWrite = lazy(() => import('page/CTF/admin/ChallengeWrite'));
const ChallengeAdmin = lazy(() => import('page/CTF/admin/ChallengeAdmin'));
const Ctf = lazy(() => import('page/CTF/Ctf'));
const ScoreBoard = lazy(() => import('page/CTF/ScoreBoard'));
const Team = lazy(() => import('page/CTF/Team'));
const TeamJoin = lazy(() => import('page/CTF/TeamJoin'));
const Operation = lazy(() => import('page/CTF/admin/Operation'));
const Submissions = lazy(() => import('page/CTF/admin/Submissions'));
const Challenge = lazy(() => import('page/CTF/Challenge'));

const CTFApp = ({}) => {
  return (
    <AuthUser>
      <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-row">
          <CTFHeader />
          <Routes>
            <Route path="/" element={<Ctf />} />
            <Route path="/scoreboard" element={<ScoreBoard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/teamjoin" element={<TeamJoin />} />
            <Route path="/admin/challengeWrite" element={<ChallengeWrite />} />
            <Route path="/admin/challengeAdmin" element={<ChallengeAdmin />} />
            <Route path="/admin/operation" element={<Operation />} />
            <Route path="/admin/submissions" element={<Submissions />} />
            <Route path="/challenge" element={<Challenge />} />
          </Routes>
        </div>
      </div>
    </AuthUser>
  );
};
export default CTFApp;
