import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = {
    user: userReducer,
    cart: cartReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
