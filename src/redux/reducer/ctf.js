// redux
import actionCtf from 'redux/action/ctf';
import actionMember from 'redux/action/member';

const initialState = { ctfId: null };
const reducerCtf = (state = initialState, action) => {
  switch (action.type) {
    case actionCtf.updateInfo.type:
      return { ...state, ctfId: action.payload };
    case actionMember.signOut.type:
      return initialState;
  }
  return state;
};

export default reducerCtf;
