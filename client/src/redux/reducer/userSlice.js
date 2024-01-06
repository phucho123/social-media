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
        updateUser: (state, action) => {
            const userUpdated = JSON.parse(window.localStorage.getItem('user'));
            userUpdated.user = action.payload;
            window.localStorage.setItem("user", JSON.stringify(userUpdated));
            state.user.user = action.payload;
            console.log(action.payload);
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

export function updateUser(data) {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.updateUser(data));
    }
}