import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProfile from '../EditProfile';
import Profile from '../Profile';
import MyPageRoute from './MyPageRoute';
import AuthUser from 'shared/AuthUser';
import OldProfile from '../OldProfile';

const ProfileRoute = () => {
  return (
    <AuthUser>
      <Routes>
        <Route exact path="" element={<Profile />} />
        <Route exact path="old" element={<OldProfile />} />
        <Route exact path="edit" element={<EditProfile />} />
        <Route exact path="mypage/*" element={<MyPageRoute />} />
      </Routes>
    </AuthUser>
  );
};

export default ProfileRoute;
