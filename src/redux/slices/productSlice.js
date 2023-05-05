import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        success: false,
    },
    reducers: {
        deleteProductRequest: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state) => {
            state.success = true;
            state.loading = false;
        },
        deleteProductReset: (state) => {
            state.success = false;
            state.loading = false;
        },
    },
});

const { actions, reducer } = productSlice;
export const {
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductReset,
} = actions;
export default reducer;
