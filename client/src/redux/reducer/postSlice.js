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
        },
        likePost: (state, action) => {
            const index = state.posts.findIndex(post => post._id == action.payload.postId);

            if (index != -1) {
                state.posts[index].likes.push(action.payload.userId);
            }
        },
        unlikePost: (state, action) => {
            const index = state.posts.findIndex(post => post._id == action.payload.postId);

            if (index != -1) {
                state.posts[index].likes = state.posts[index].likes.filter(userId => userId != action.payload.userId);
            }
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

export const likePost = (data) => {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.likePost(data));
    }
}

export const unlikePost = (data) => {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.unlikePost(data));
    }
}