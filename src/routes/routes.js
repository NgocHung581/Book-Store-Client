const routes = {
    home: "/",
    login: "/login",
    register: "/register",
    verifyEmail: "/verify-email",
    resetPassword: "/reset-password",
    cart: "/cart",
    wishlist: "/wishlist",
    search: "/search",
    contact: "/contact",
    category: "/category/:slug",
    book: "/book",
    bookDetail: "/book/:slug",
    checkout: "/checkout",
    profile: "/profile",
    order: "/order",
    orderDetail: "/order/:id",
    createBook: "/create",
    notFound: "*",
};

export default routes;
