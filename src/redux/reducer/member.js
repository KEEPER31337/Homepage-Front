// redux
import actionMember from 'redux/action/member';

const initialState = { token: '', memberInfo: {} };
const reducerMember = (state = initialState, action) => {
  switch (action.type) {
    case actionMember.updateToken.type:
      return { ...state, token: action.payload };
    case actionMember.signIn.type:
      // console.log('payload', action.payload);
      return {
        token: action.payload.token,
        userInfo: action.payload.userInfo,
      };
    case actionMember.signOut.type:
      return initialState;
  }
  return state;
};

export default reducerMember;
