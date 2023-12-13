import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./reducer/themeSlice";
import postSlice from "./reducer/postSlice";
import userSlice from "./reducer/userSlice";
import loadingSlice from "./reducer/loadingSlice";


const rootReducer = combineReducers({
    theme: themeSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    loading: loadingSlice.reducer
});

export const store = configureStore({ reducer: rootReducer });
export { rootReducer };


