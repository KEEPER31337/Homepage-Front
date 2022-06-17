import { createAction } from '@reduxjs/toolkit';

const actionMember = {
  updateId: createAction('ctf/updateId'),
  updateName: createAction('ctf/updateName'),
};

export default actionMember;
