import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerDarkMode from './darkMode';
import reducerMember from './member';

const persistConfig = {
  key: 'root',
  storage,
  // TODO : whitelist
};

const rootReducer = combineReducers({
  darkMode: reducerDarkMode,
  member: reducerMember,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
