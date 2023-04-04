import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const darkMode = localStorage.getItem("darkTheme")
    ? JSON.parse(localStorage.getItem("darkTheme"))
    : false;

const initialState = {
    user,
    error: "",
    loading: false,
    darkMode,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginPending: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
            localStorage.setItem("darkTheme", JSON.stringify(state.darkMode));
        },
    },
});

const { actions, reducer } = userSlice;
export const {
    loginPending,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
    setDarkMode,
} = actions;
export default reducer;
