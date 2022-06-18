// redux
import actionCtf from 'redux/action/ctf';
import actionMember from 'redux/action/member';

const initialState = { ctfId: null, ctfName: null, ctfTeamName: null };
const reducerCtf = (state = initialState, action) => {
  switch (action.type) {
    case actionCtf.updateId.type:
      return { ...state, ctfId: action.payload };
    case actionCtf.updateName.type:
      return { ...state, ctfName: action.payload };
    case actionCtf.updateTeamName.type:
      return { ...state, ctfTeamName: action.payload };
    case actionMember.signOut.type:
      return initialState;
  }
  return state;
};

export default reducerCtf;
