import { createAction } from '@reduxjs/toolkit';

const actionVote = {
  updateId: createAction('vote/updateId'),
  updateName: createAction('vote/updateName'),
};

export default actionVote;
