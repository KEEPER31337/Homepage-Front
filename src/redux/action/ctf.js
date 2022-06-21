import { createAction } from '@reduxjs/toolkit';

const actionCtf = {
  updateId: createAction('ctf/updateId'),
  updateName: createAction('ctf/updateName'),
  updateTeamName: createAction('ctf/updateTeamName'),
};

export default actionCtf;
