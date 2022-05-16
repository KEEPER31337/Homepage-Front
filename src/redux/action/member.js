import { createAction } from '@reduxjs/toolkit';

const actionMember = {
  updateToken: createAction('member/updateToken'),
  signIn: createAction('member/signIn'),
  signOut: createAction('member/signOut'),
  updateInfo: createAction('member/updateInfo'),
};

export default actionMember;
