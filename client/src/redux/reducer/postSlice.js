import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost: (state, action) => {
            state.posts = action.payload;
        },
        updatePost: (state, action) => {
            // 
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id != action.payload);
        }
    }
})

export default postSlice;

export const setPost = (data) => {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.setPost(data));
    }
}

export const deletePost = (data) => {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.deletePost(data));
    }
}