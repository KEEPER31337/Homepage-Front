// redux
import actionVote from 'redux/action/vote';
import actionMember from 'redux/action/member';

const initialState = { voteId: null, voteName: null };
const reducerVote = (state = initialState, action) => {
  switch (action.type) {
    case actionVote.updateId.type:
      return { ...state, voteId: action.payload };
    case actionVote.updateName.type:
      return { ...state, voteName: action.payload };
    case actionMember.signOut.type:
      return initialState;
  }
  return state;
};

export default reducerVote;
