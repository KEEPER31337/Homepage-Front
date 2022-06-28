import { createAction } from '@reduxjs/toolkit';

const actionBoardState = {
  changeMode: createAction('boardState/changeMode'),
  search: createAction('boardState/search'),
  changePage: createAction('boardState/changePage'),
  initialize: createAction('boardState/initialize'),
};

export default actionBoardState;
