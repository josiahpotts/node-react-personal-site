// actions.js

export const updateMessageHistory = (message) => {
    return {
      type: 'UPDATE_MESSAGE_HISTORY',
      payload: message,
    };
  };
  

export const clearMessageHistory = () => {
    return {
      type: 'CLEAR_MESSAGE_HISTORY',
    };
  };

  export const updateToggleChatBox = () => {
    return {
      type: 'UPDATE_TOGGLE_CHAT_BOX',
    };
  };
  