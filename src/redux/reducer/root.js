import { combineReducers } from 'redux';

// local
import reducerDarkMode from './darkMode';

const rootReducer = combineReducers({
  darkMode: reducerDarkMode,
});

export default rootReducer;
