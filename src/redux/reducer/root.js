import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// local
import reducerDarkMode from './darkMode';
import reducerMember from './member';
import reducerCategory from './category';
import reducerBoardState from './boardState';
//import reducerChat from './chat';
import reducerCtf from './ctf';
import reducerVote from './vote';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boardState', 'darkMode', 'member', 'ctf', 'vote'],
};

const rootReducer = combineReducers({
  boardState: reducerBoardState,
  darkMode: reducerDarkMode,
  member: reducerMember,
  //chat: persistReducer(persistConfig, reducerChat),
  ctf: reducerCtf,
  vote: reducerVote,
  category: reducerCategory,
});

export default persistReducer(persistConfig, rootReducer);
