import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerDarkMode from './darkMode';

const persistConfig = {
  key: 'root',
  storage,
  // TODO : whitelist
};

const rootReducer = combineReducers({
  darkMode: reducerDarkMode,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
