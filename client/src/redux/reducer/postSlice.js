import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts: [],
    comments: {
        openComments: false,
        postId: "",
        commentList: [
            // {
            //     "userId": "65786d3b59d6665c5eb54c1e",
            //     "postId": "6579aebf3edb19b4b065e2ed",
            //     "comment": "hello there 2",
            //     "from": "Anakin",
            //     "likes": [],
            //     "_id": "657ac56b6eafa86820869717",
            //     "createdAt": "2023-12-14T09:05:47.464Z",
            //     "updatedAt": "2023-12-14T09:05:47.464Z",
            //     "__v": 0
            // }
        ]
    }
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
        },
        toggleComments: (state, action) => {
            state.comments.openComments = action.payload.open;
            state.comments.postId = action.payload.postId;
        },
        setComments: (state, action) => {
            state.comments.commentList = action.payload;
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

export const toggleComments = (data) => {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.toggleComments(data));
    }
}

export const setComments = (data) => {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.setComments(data));
    }
}