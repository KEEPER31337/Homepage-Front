import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import ItManagerHeader from '../Components/ItManagerHeader';
const Appointment = lazy(() => import('./Appointment'));
const ItManagerApp = ({}) => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-row">
        <ItManagerHeader />
        <Routes>
          <Route path="/" element={<Appointment />} />
        </Routes>
      </div>
    </div>
  );
};
export default ItManagerApp;
