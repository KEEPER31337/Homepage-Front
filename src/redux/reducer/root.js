import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerDarkMode from './darkMode';
import reducerMember from './member';
import reducerCategory from './category';
import reducerBoardStyle from './boardStyle';

const persistConfig = {
  key: 'root',
  storage,
  // TODO : whitelist
};

const rootReducer = combineReducers({
  boardStyle: reducerBoardStyle,
  darkMode: reducerDarkMode,
  member: reducerMember,
  category: reducerCategory,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
