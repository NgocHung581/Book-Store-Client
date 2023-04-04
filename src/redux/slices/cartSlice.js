import { createSlice } from "@reduxjs/toolkit";

const cartLocalStorage = localStorage.getItem("cart");

const initialState = {
    cart: cartLocalStorage ? JSON.parse(cartLocalStorage).cart : [],
    subTotal: cartLocalStorage ? JSON.parse(cartLocalStorage).subTotal : 0,
    isUsePoint: cartLocalStorage
        ? JSON.parse(cartLocalStorage).isUsePoint
        : false,
    totalPrice: cartLocalStorage ? JSON.parse(cartLocalStorage).totalPrice : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existItem = state.cart.find(
                (item) => item.id === action.payload.id
            );

            if (existItem) {
                state.cart = state.cart.filter((item) =>
                    item.id === action.payload.id
                        ? (item.quantity += action.payload.quantity)
                        : item
                );
            } else {
                state.cart.push(action.payload);
            }

            localStorage.setItem("cart", JSON.stringify(state));
        },
        updateQuantity: (state, action) => {
            state.cart.filter((item) =>
                item.id === action.payload.id
                    ? (item.quantity = action.payload.quantity)
                    : item
            );
            localStorage.setItem("cart", JSON.stringify(state));
        },
        updateCartOnCheckout: (state) => {
            state.cart = state.cart.filter((item) => !item.checked);
            state.isUsePoint = false;
            state.subTotal = 0;
            state.totalPrice = 0;
            if (state.cart.length <= 0) return localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(state));
        },
        checkItem: (state, action) => {
            state.cart.filter((item) =>
                item.id === action.payload.id
                    ? (item.checked = action.payload.checked)
                    : item
            );

            localStorage.setItem("cart", JSON.stringify(state));
        },
        checkAllItem: (state, action) => {
            state.cart = state.cart.map((item) => {
                item.checked = action.payload;
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(state));
        },
        deleteCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );
            if (state.cart.length <= 0) return localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(state));
        },
        updateIsUseCount: (state, action) => {
            state.isUsePoint = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        updateSubTotal: (state, action) => {
            state.subTotal = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        updateTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

const { actions, reducer } = cartSlice;
export const {
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
