import { createAction } from '@reduxjs/toolkit';

const actionMember = {
  updateId: createAction('ctf/updateId'),
  updateName: createAction('ctf/updateName'),
  updateTeamName: createAction('ctf/updateTeamName'),
};

export default actionMember;
