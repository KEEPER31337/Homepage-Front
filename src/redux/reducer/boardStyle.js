// redux
import actionBoardStyle from 'redux/action/boardStyle';

const initialState = { mode: 'text' };
const reducerBoardStyle = (state = initialState, action) => {
  switch (action.type) {
    case actionBoardStyle.changeMode.type:
      return { ...state, mode: action.payload };
  }
  return state;
};

export default reducerBoardStyle;
