import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    messages: [],
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    }
})

export default messageSlice;


export const setMessages = (data) => {
    return (dispatch, getState) => {
        dispatch(messageSlice.actions.setMessages(data));
    }
}
export const addMessage = (data) => {
    return (dispatch, getState) => {
        dispatch(messageSlice.actions.addMessage(data));
    }
}
