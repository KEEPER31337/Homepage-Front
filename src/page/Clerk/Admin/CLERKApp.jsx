import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import CLERKHeader from '../Components/CLERKHeader';
const Appointment = lazy(() => import('./Appointment'));
const Point = lazy(() => import('./Point'));
const ReasonOfPoint = lazy(() => import('./ReasonOfPoint'));
const TableOfAttend = lazy(() => import('./TableOfAttend'));
const ReviseAppointment = lazy(() =>
  import('../Components/Appointment/Revise/ReviseAppointment')
);
const CLERKApp = ({}) => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-row">
        <CLERKHeader />
        <Routes>
          <Route path="/" element={<Appointment />} />
          <Route path="/point" element={<Point />} />
          <Route path="/reason" element={<ReasonOfPoint />} />
          <Route path="/attend" element={<TableOfAttend />} />
          <Route path="/revise" element={<ReviseAppointment />} />
        </Routes>
      </div>
    </div>
  );
};
export default CLERKApp;
