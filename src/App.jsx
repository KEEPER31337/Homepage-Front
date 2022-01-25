import React from 'react';
import Header from 'shared/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

// local
import Home from 'page/Home/Home';
import About from 'page/About/About';
import Attandance from 'page/Attandance/Attandance';
import BoardMain from 'page/Board/BoardMain';
import BoardView from 'page/Board/BoardView';
import BoardWrite from 'page/Board/BoardWrite';
import Event from 'page/Event/Event';
import Game from 'page/Game/Game';
import Library from 'page/Library/Library';
import Profile from 'page/Profile/Profile';
import Schedule from 'page/Schedule/Schedule';
import SignIn from 'page/SignIn/SignIn';
import SignUp from 'page/SignUp/SignUp';
import { actions } from './store';

const App = (props) => {
  return (
    <div className="content-center">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/attandance" element={<Attandance />} />
        <Route path="/board" element={<BoardMain />} />
        <Route path="/board/:no" element={<BoardView />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/event" element={<Event />} />
        <Route path="/game" element={<Game />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};
const mapDispatchToProps = (dispatch, OwnProps) => {
  return {
    darkModeToggle: () => {
      dispatch(actions.darkModeToggle());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
