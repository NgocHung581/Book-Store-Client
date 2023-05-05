const routes = {
    home: "/",
    login: "/login",
    register: "/register",
    verifyEmail: "/verify-email",
    resetPassword: "/reset-password",
    cart: "/cart",
    wishlist: "/wishlist",
    search: "/search",
    searchOnAmazon: "/search-on-amazon/:id",
    contact: "/contact",
    category: "/category/:slug",
    book: "/book",
    bookDetail: "/book/:slug",
    checkout: "/checkout",
    profile: "/profile",
    order: "/order",
    orderDetail: "/order/:id",
    dashboard: "/admin/dashboard",
    manageProduct: "/admin/product",
    createBook: "/admin/product/add",
    updateBook: "/admin/product/update/:slug",
    manageCategory: "/admin/category",
    createCategory: "/admin/category/add",
    updateCategory: "/admin/category/update/:slug",
    manageOrder: "/admin/order",
    manageUser: "/admin/user",
    notFound: "*",
};

export default routes;
