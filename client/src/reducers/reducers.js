// reducers.js

const initialState = {
    messageHistory: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGE_HISTORY':
            return {
                ...state,
                messageHistory: [...state.messageHistory, action.payload],
            };
        case 'CLEAR_MESSAGE_HISTORY':
            return {
                ...state,
                messageHistory: [],
            };
        case 'UPDATE_TOGGLE_CHAT_BOX':
            return {
                ...state,
                showChatBox: !state.showChatBox,
            };
        default:
            return state;
    }
};

export default reducer;
