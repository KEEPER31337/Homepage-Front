// redux
import actionDarkMode from 'redux/action/darkMode';

const initialState = { isDark: false };
const reducerDarkMode = (state = initialState, action) => {
  switch (action.type) {
    case actionDarkMode.toggle.type:
      return { ...state, isDark: !state?.isDark };
  }
  return state;
};

export default reducerDarkMode;
