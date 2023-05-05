import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import reviewReducer from "./slices/reviewSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";

const rootReducer = {
    user: userReducer,
    cart: cartReducer,
    review: reviewReducer,
    product: productReducer,
    category: categoryReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
