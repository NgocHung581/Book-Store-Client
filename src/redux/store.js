import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import reviewReducer from "./slices/reviewSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import chatReducer from "./slices/chatSlice";

const rootReducer = {
    user: userReducer,
    carts: cartReducer,
    review: reviewReducer,
    product: productReducer,
    category: categoryReducer,
    chat: chatReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
