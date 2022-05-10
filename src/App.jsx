import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

// local
import Chatting from 'shared/Chat/Chatting';
import Header from 'shared/Header.jsx';
import attendanceAPI from 'API/v1/attendance';
import actionMember from 'redux/action/member';
// pages
const Home = lazy(() => import('page/Home/Home'));
const About = lazy(() => import('page/About/About'));
const Attandance = lazy(() => import('page/Attandance/Attandance'));
const BoardMain = lazy(() => import('page/Board/BoardMain'));
const BoardView = lazy(() => import('page/Board/BoardView'));
const BoardWrite = lazy(() => import('page/Board/BoardWrite'));
const Event = lazy(() => import('page/Event/Event'));
const Game = lazy(() => import('page/Game/Game'));
const Library = lazy(() => import('page/Library/Library'));
const ProfileRoute = lazy(() => import('page/Profile/Routes/ProfileRoute'));
const Schedule = lazy(() => import('page/Schedule/Schedule'));
const SignIn = lazy(() => import('page/SignIn/SignIn'));
const FindId = lazy(() => import('page/SignIn/Components/FindId'));
const FindPassword = lazy(() => import('page/SignIn/Components/FindPassword'));
const SignUp = lazy(() => import('page/SignUp/SignUp'));
const BookAdd = lazy(() => import('./page/Library/BookAdd'));
const BookManage = lazy(() => import('./page/Library/BookManage'));
const Ranking = lazy(() => import('page/Ranking/Ranking'));
const Study = lazy(() => import('page/Study/Study'));
const ChallengeWrite = lazy(() => import('page/CTF/admin/ChallengeWrite'));
const ChallengeAdmin = lazy(() => import('page/CTF/admin/ChallengeAdmin'));

const App = ({ member, darkMode, signOut }) => {
  useEffect(() => {
    if (member.token) {
      attendanceAPI.check({ token: member.token }).then((data) => {
        if (data.code == -1003) signOut();
      });
    }
  }, [member]);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/attandance" element={<Attandance />} />
            <Route path="/board/:categoryId" element={<BoardMain />} />
            <Route path="/post/:categoryId/:postId" element={<BoardView />} />
            <Route path="/write/:categoryId" element={<BoardWrite />} />
            <Route path="/event" element={<Event />} />
            <Route path="/game" element={<Game />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/add" element={<BookAdd />} />
            <Route path="/library/manage" element={<BookManage />} />
            <Route path="/profile/:userId/*" element={<ProfileRoute />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signin/findid" element={<FindId />} />
            <Route path="/signin/findpassword" element={<FindPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/study" element={<Study />} />
            <Route path="/ctf/admin/challengeWrite" element={<ChallengeWrite />} />
            <Route path="/ctf/admin/challengeAdmin" element={<ChallengeAdmin />} />
          </Routes>
        </Suspense>
        <Chatting />
      </>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { darkMode: state.darkMode, member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
