import { createAction } from '@reduxjs/toolkit';

const actionDarkMode = {
  toggle: createAction('darkMode/toggle'),
};

export default actionDarkMode;
