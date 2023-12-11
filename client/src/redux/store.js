import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./reducer/themeSlice";
import postSlice from "./reducer/postSlice";
import userSlice from "./reducer/userSlice";


const rootReducer = combineReducers({
    theme: themeSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer
});

export const store = configureStore({ reducer: rootReducer });
export { rootReducer };


