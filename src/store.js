import { createStore } from 'redux';
import { createAction } from '@reduxjs/toolkit';

const darkModeToggle = createAction('darkMode/toggle');

const initialState = { darkMode: false };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case darkModeToggle.type:
      return { ...state, darkMode: !state.darkMode };
  }
  return state;
};

const store = createStore(reducer);

export const actions = { darkModeToggle };
export default store;
