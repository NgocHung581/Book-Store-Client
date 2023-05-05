import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        loading: false,
        success: false,
    },
    reducers: {
        deleteCategoryRequest: (state) => {
            state.loading = true;
        },
        deleteCategorySuccess: (state) => {
            state.success = true;
            state.loading = false;
        },
        deleteCategoryReset: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
});

const { actions, reducer } = categorySlice;
export const {
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryReset,
} = actions;
export default reducer;
