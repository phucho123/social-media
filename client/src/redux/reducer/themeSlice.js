import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // theme: JSON.parse(window?.localStorage.getItem("theme")) ?? "light"
    theme: "dark",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            window.localStorage.setItem("theme", action.payload);
            state.theme = action.payload;
        }
    }
})

export default themeSlice