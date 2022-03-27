import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProfile from '../EditProfile';
import Profile from '../Profile';
import AuthUser from 'shared/AuthUser';

const ProfileRoute = () => {
  return (
    <AuthUser>
      <Routes>
        <Route exact path="" element={<Profile />} />
        <Route exact path="edit" element={<EditProfile />} />
      </Routes>
    </AuthUser>
  );
};

export default ProfileRoute;
