import { createAction } from '@reduxjs/toolkit';

const actionDarkMode = {
  toggle: createAction('darkMode/toggle'),
};

const initialState = false;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionDarkMode.toggle.type:
      return !state;
  }
  return state;
};

export { actionDarkMode };
export default reducer;
