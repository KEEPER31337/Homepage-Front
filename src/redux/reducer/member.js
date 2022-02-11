// redux
import actionMember from 'redux/action/member';

const initialState = { token: '' };
const reducerMember = (state = initialState, action) => {
  switch (action.type) {
    case actionMember.updateToken.type:
      return { ...state, token: action.payload };
  }
  return state;
};

export default reducerMember;
