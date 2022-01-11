import React from 'react';
import Header from 'shared/Header.jsx';
import { Route, Routes } from 'react-router-dom';

import Home from 'page/Home/Home';
import About from 'page/About/About';
import Attandance from 'page/Attandance/Attandance';
import Board from 'page/Board/Board';
import Game from 'page/Game/Game';
import Library from 'page/Library/Library';
import Profile from 'page/Profile/Profile';
import Schedule from 'page/Schedule/Schedule';
import SignIn from 'page/SignIn/SignIn';
import SignUp from 'page/SignUp/SignUp';

const App = (props) => {
  return (
    <div className="content-center bg-mainWhite">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/attandance" element={<Attandance />} />
        <Route path="/board" element={<Board />} />
        <Route path="/game" element={<Game />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
