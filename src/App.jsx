import React, { Fragment } from 'react';
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
import ProfileRoute from 'page/Profile/Routes/ProfileRoute';
import Schedule from 'page/Schedule/Schedule';
import SignIn from 'page/SignIn/SignIn';
import SignUp from 'page/SignUp/SignUp';
import BookAdd from './page/Library/BookAdd';

const App = (props) => {
  const darkMode = props.state.darkMode;
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <>
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
          <Route path="/library/add" element={<BookAdd />} />
          <Route path="/profile/:userId/*" element={<ProfileRoute />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </>
    </div>
  );
};

const mapStateToProps = (state, OwnProps) => {
  return { state };
};

export default connect(mapStateToProps)(App);
