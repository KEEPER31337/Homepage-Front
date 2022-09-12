// redux
import actionBoardState from 'redux/action/boardState';

const initialState = { mode: 'text', keyword: null, curPage: 1 };
const reducerBoardState = (state = initialState, action) => {
  switch (action.type) {
    case actionBoardState.changeMode.type:
      return { ...state, mode: action.payload };
    case actionBoardState.search.type:
      return {
        ...state,
        type: action.payload.type,
        keyword: action.payload.keyword,
      };
    case actionBoardState.changePage.type:
      return { ...state, curPage: action.payload };
    case actionBoardState.initialize.type:
      return { ...state, keyword: null, curPage: 1 };
  }
  return state;
};

export default reducerBoardState;
