import { createStore } from 'redux';

// redux
import rootReducer from 'redux/reducer/root';

const store = createStore(rootReducer);

export default store;
