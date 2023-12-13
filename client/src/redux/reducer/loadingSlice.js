import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // theme: JSON.parse(window?.localStorage.getItem("theme")) ?? "light"
    fullScreen: false,
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadingFullScreen: (state, action) => {
            state.fullScreen = action.payload;
        }
    }
});

export default loadingSlice

export const loadingFullScreen = (data) => {
    return (dispatch, getState) => {
        dispatch(loadingSlice.actions.loadingFullScreen(data));
    }
}