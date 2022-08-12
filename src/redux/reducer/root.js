import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerDarkMode from './darkMode';
import reducerMember from './member';
import reducerCategory from './category';
import reducerBoardState from './boardState';
import reducerChat from './chat';
import reducerCtf from './ctf';
import reducerVote from './vote';

const persistConfig = {
  key: 'root',
  storage,
  // TODO : whitelist
};

const rootReducer = combineReducers({
  boardState: persistReducer(persistConfig, reducerBoardState),
  darkMode: persistReducer(persistConfig, reducerDarkMode),
  member: persistReducer(persistConfig, reducerMember),
  chat: persistReducer(persistConfig, reducerChat),
  ctf: persistReducer(persistConfig, reducerCtf),
  vote: persistReducer(persistConfig, reducerVote),
  category: reducerCategory,
});

export default rootReducer;
