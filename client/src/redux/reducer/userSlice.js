import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user"))
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            window.localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        register: (state, action) => {

        }
    }
})

export default userSlice


export function userLogin(data) {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.login(data));
    }
}