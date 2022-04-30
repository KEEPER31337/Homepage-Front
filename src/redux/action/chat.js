import { createAction } from '@reduxjs/toolkit';

const actionChat = {
  loadChatList: createAction('chat/loadChatList'),
  addChat: createAction('chat/addChat'),
};

export default actionChat;
