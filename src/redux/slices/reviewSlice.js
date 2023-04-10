import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        loading: false,
        success: false,
    },
    reducers: {
        createReviewRequest: (state) => {
            state.loading = true;
        },
        createReviewSuccess: (state) => {
            state.success = true;
            state.loading = false;
        },
        createReviewReset: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
});

const { actions, reducer } = reviewSlice;
export const { createReviewRequest, createReviewSuccess, createReviewReset } =
    actions;
export default reducer;
