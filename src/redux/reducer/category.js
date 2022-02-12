// redux
import actionCategory from 'redux/action/category';

const initialState = { current: 0 };
const reducerCategory = (state = initialState, action) => {
  switch (action.type) {
    case actionCategory.updateCurrent.type:
      return { ...state, current: action.payload };
  }
  return state;
};

export default reducerCategory;
