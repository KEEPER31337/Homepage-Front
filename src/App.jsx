import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

// local
//import Chatting from 'shared/Chat/Chatting';
import Header from 'shared/Header.jsx';
import memberAPI from 'API/v1/member';
import attendanceAPI from 'API/v1/attendance';
import actionMember from 'redux/action/member';
import CTFApp from 'page/CTF/CTFApp.jsx';
import VOTEApp from 'page/Vote/VOTEApp';
import CLERKApp from 'page/Clerk/Admin/CLERKApp';
import ItManagerApp from 'page/ItManager/Admin/ItManagerApp';

// pages
import Loading from 'shared/Loading';
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
const AutoAttend = lazy(() => import('page/Clerk/AutoAttend'));
const StartAttend = lazy(() =>
  import('page/Clerk/Components/AutoAttend/StartAttend')
);
const DoAttend = lazy(() =>
  import('page/Clerk/Components/AutoAttend/DoAttend')
);
const Research = lazy(() => import('page/Clerk/Research'));

const App = ({ member, isDark, signOut, updateInfo }) => {
  useEffect(() => {
    if (member.token) {
      attendanceAPI.check({ token: member.token }).then((data) => {
        if (data.success) {
          memberAPI.getMember({ token: member.token }).then((data) => {
            if (data.success) {
              const token = member.token;
              const memberInfo = data.data;
              updateInfo({ token, memberInfo });
            }
          });
        }
        if (data.code == -1003) {
          signOut();
          navigate('/signIn');
        }
      });
    }
  }, [member]);

  return (
    //TODO 다음에 다크모드로 기본 바꾸기
    <div className={isDark ? 'dark' : 'light'}>
      <>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/attandance" element={<Attandance />} />
            <Route path="/board/:categoryName" element={<BoardMain />} />
            <Route path="/post/:categoryName/:postId" element={<BoardView />} />
            <Route path="/write/:categoryName" element={<BoardWrite />} />
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
            <Route path="/ctf/*" element={<CTFApp />} />
            <Route path="/vote/*" element={<VOTEApp />} />
            <Route path="/autoAttend" element={<AutoAttend />} />
            <Route path="/startAttend" element={<StartAttend />} />
            <Route path="/doAttend" element={<DoAttend />} />
            <Route path="/research" element={<Research />} />
            <Route path="/clerk/*" element={<CLERKApp />} />
            <Route path="/ItManager/*" element={<ItManagerApp />} />
          </Routes>
        </Suspense>
        {/*<Chatting />*/}
      </>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { isDark: state.darkMode?.isDark, member: state.member };
};

const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    updateInfo: ({ token, memberInfo }) => {
      dispatch(actionMember.updateInfo({ token, memberInfo }));
    },
    signOut: () => {
      dispatch(actionMember.signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
