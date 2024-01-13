import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    imageModal: {
        open: false,
        imageUrl: "",
    },
    updateUserModal: {
        open: false
    }
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleImageModal: (state, action) => {
            state.imageModal.open = action.payload.open;
            if (action.payload.imageUrl) {
                state.imageModal.imageUrl = action.payload.imageUrl;
            }
        },
        toggleUpdateUserModal: (state, action) => {
            state.updateUserModal.open = action.payload.open;
        }
    }
})

export default modalSlice;


export const toggleImageModal = (data) => {
    return (dispatch, getState) => {
        dispatch(modalSlice.actions.toggleImageModal(data));
    }
}

export const toggleUpdateUserModal = (data) => {
    return (dispatch, getState) => {
        dispatch(modalSlice.actions.toggleUpdateUserModal(data));
    }
}
