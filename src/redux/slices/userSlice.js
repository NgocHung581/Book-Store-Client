import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const initialState = {
    user,
    error: "",
    loading: false,
    success: false,
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
        deleteUserRequest: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.success = true;
            state.loading = false;
        },
        deleteUserReset: (state) => {
            state.success = false;
            state.loading = false;
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
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserReset,
} = actions;
export default reducer;
