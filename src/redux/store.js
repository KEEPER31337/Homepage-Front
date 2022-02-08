import { createStore } from 'redux';

// local
import rootReducer from './rootReducer';

const store = createStore(rootReducer);

export default store;
