import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: [],
    subTotal: 0,
    isUsePoint: false,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        fetchCarts: (state, action) => {
            state.carts = action.payload;
        },
        addToCart: (state, action) => {
            const existingCart = state.carts.find(
                (cart) => cart._id === action.payload._id
            );

            if (existingCart) {
                state.carts.map((cart) =>
                    cart._id === action.payload._id
                        ? (cart.quantity = action.payload.quantity)
                        : cart
                );
                return;
            }

            state.carts.push(action.payload);
        },
        updateQuantity: (state, action) => {
            state.carts.map((cart) =>
                cart._id === action.payload._id
                    ? (cart.quantity = action.payload.quantity)
                    : cart
            );
        },
        deleteCart: (state, action) => {
            state.carts = state.carts.filter(
                (item) => item._id !== action.payload._id
            );
        },
        updateCartOnCheckout: (state) => {
            state.carts = state.carts.filter((item) => !item.isChecked);
            state.isUsePoint = false;
            state.subTotal = 0;
            state.totalPrice = 0;
        },
        checkItem: (state, action) => {
            state.carts.map((cart) =>
                cart._id === action.payload
                    ? (cart.isChecked = !cart.isChecked)
                    : cart
            );
        },
        checkAllItem: (state, action) => {
            state.carts.map((item) => {
                item.isChecked = action.payload;
                return item;
            });
        },
        updateIsUseCount: (state, action) => {
            state.isUsePoint = action.payload;
        },
        updateSubTotal: (state, action) => {
            state.subTotal = action.payload;
        },
        updateTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
    },
});

const { actions, reducer } = cartSlice;
export const {
    fetchCarts,
    addToCart,
    updateQuantity,
    deleteCart,
    checkItem,
    checkAllItem,
    updateSubTotal,
    updateIsUseCount,
    updateTotalPrice,
    updateCartOnCheckout,
} = actions;
export default reducer;
