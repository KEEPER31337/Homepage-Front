// redux
import actionMember from 'redux/action/member';

const initialState = { token: '', userInfo: {} };
const reducerMember = (state = initialState, action) => {
  switch (action.type) {
    case actionMember.updateToken.type:
      return { ...state, token: action.payload };
    case actionMember.signIn.type:
      return {
        token: action.payload.token,
        userInfo: action.payload,
      };
    case actionMember.signOut.type:
      return initialState;
  }
  return state;
};

export default reducerMember;
