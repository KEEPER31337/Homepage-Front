// redux
import actionChat from 'redux/action/chat';

const initialState = { chatList: [], savedId: 0 };
const reducerMember = (state = initialState, action) => {
  switch (action.type) {
    case actionChat.loadChatList.type:
      const { chatLogList, timeSince } = action.payload;
      const filteredChatList = state.chatList.filter(
        (chat) => chat.time > timeSince
      );
      const updateChatLogList = filteredChatList.concat(chatLogList);
      if (updateChatLogList.length <= 0) {
        return state;
      }
      return {
        chatList: updateChatLogList,
        savedId: updateChatLogList[updateChatLogList.length - 1]?.id,
      };
    case actionChat.addChat.type:
      if (!action.payload.id) {
        return state;
      }
      return {
        chatList: [...state.chatList, action.payload],
        savedId: action.payload.id,
      };
  }
  return state;
};

export default reducerMember;
