import { combineReducers } from 'redux';

// local
import reducerDarkMode from './reducerDarkMode';

const rootReducer = combineReducers({
  darkMode: reducerDarkMode,
});

export default rootReducer;
