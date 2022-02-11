import { createAction } from '@reduxjs/toolkit';

const actionMember = {
  updateToken: createAction('member/updateToken'),
  updateInfo: createAction('member/updateInfo'),
  updateEmail: createAction('member/updateEmail'),
  updateImage: createAction('member/updateImage'),
};

export default actionMember;
