import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Contact from "pages/Contact";
import routes from "routes";
import Book from "pages/Book";
import HeaderAndFooterLayout from "layouts/HeaderAndFooterLayout";
import AuthLayout from "layouts/AuthLayout";
import Cart from "pages/Cart";
import Wishlist from "pages/Wishlist";
import SidebarLayout from "layouts/SidebarLayout";
import NotFound from "pages/NotFound";
import BookDetail from "pages/BookDetail";
import Checkout from "pages/Checkout";
import Search from "pages/Search";
import Profile from "pages/Profile";
import Order from "pages/Order";
import ResetPassword from "pages/ResetPassword";
import VerifyEmail from "pages/VerifyEmail";
import ProtectedRoute from "components/ProtectedRoute";
import Login from "pages/Login";
import Register from "pages/Register";
import Email from "pages/Login/Form/Email";
import Password from "pages/Login/Form/Password";
import OrderDetail from "pages/OrderDetail";
import SearchOnAmazon from "pages/SearchOnAmazon";
import AdminLayout from "layouts/AdminLayout";
import Dashboard from "pages/Admin/Dashboard";
import ManageProduct from "pages/Admin/ManageProduct";
import ManageCategory from "pages/Admin/ManageCategory";
import ManageOrder from "pages/Admin/ManageOrder";
import ManageUser from "pages/Admin/ManageUser";
import AddEditProduct from "pages/Admin/ManageProduct/AddEditProduct";
import AddEditCategory from "pages/Admin/ManageCategory/AddEditCategory";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<SidebarLayout />}>
                    <Route path={routes.book} element={<Book />} />
                    <Route path={routes.category} element={<Book />} />
                </Route>
                <Route path="/" element={<HeaderAndFooterLayout />}>
                    <Route index element={<Home />} />
                    <Route path={routes.bookDetail} element={<BookDetail />} />
                    <Route path={routes.contact} element={<Contact />} />
                    <Route path={routes.cart} element={<Cart />} />
                    <Route path={routes.wishlist} element={<Wishlist />} />
                    <Route
                        path={routes.checkout}
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={routes.search} element={<Search />} />
                    <Route
                        path={routes.searchOnAmazon}
                        element={<SearchOnAmazon />}
                    />
                    <Route
                        path={routes.profile}
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={routes.order}
                        element={
                            <ProtectedRoute>
                                <Order />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={routes.orderDetail}
                        element={
                            <ProtectedRoute>
                                <OrderDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={routes.notFound} element={<NotFound />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={routes.login} element={<Login />}>
                        <Route index element={<Email />} />
                        <Route path="password" element={<Password />} />
                    </Route>

                    <Route path={routes.register} element={<Register />} />
                    <Route
                        path={routes.resetPassword}
                        element={<ResetPassword />}
                    />
                    <Route
                        path={routes.verifyEmail}
                        element={<VerifyEmail />}
                    />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path={routes.dashboard} element={<Dashboard />} />

                    {/* Manage Product */}
                    <Route
                        path={routes.manageProduct}
                        element={<ManageProduct />}
                    />
                    <Route
                        path={routes.createBook}
                        element={<AddEditProduct />}
                    />
                    <Route
                        path={routes.updateBook}
                        element={<AddEditProduct />}
                    />

                    {/* Manage Category */}
                    <Route
                        path={routes.manageCategory}
                        element={<ManageCategory />}
                    />
                    <Route
                        path={routes.createCategory}
                        element={<AddEditCategory />}
                    />
                    <Route
                        path={routes.updateCategory}
                        element={<AddEditCategory />}
                    />

                    {/* Manage Order */}
                    <Route
                        path={routes.manageOrder}
                        element={<ManageOrder />}
                    />

                    {/* Manage User */}
                    <Route path={routes.manageUser} element={<ManageUser />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
