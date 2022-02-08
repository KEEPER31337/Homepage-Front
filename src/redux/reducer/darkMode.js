// redux
import actionDarkMode from 'redux/action/darkMode';

const initialState = false;
const reducerDarkMode = (state = initialState, action) => {
  switch (action.type) {
    case actionDarkMode.toggle.type:
      return !state;
  }
  return state;
};

export default reducerDarkMode;
