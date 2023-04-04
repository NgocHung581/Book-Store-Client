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
import FormCreateBook from "pages/Admin/FormCreateBook";
import ResetPassword from "pages/ResetPassword";
import VerifyEmail from "pages/VerifyEmail";
import ProtectedRoute from "components/ProtectedRoute";
import Login from "pages/Login";
import Register from "pages/Register";
import Email from "pages/Login/Form/Email";
import Password from "pages/Login/Form/Password";
import OrderDetail from "pages/OrderDetail/OrderDetail";

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
                    <Route
                        path={routes.createBook}
                        element={<FormCreateBook />}
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
            </Routes>
        </div>
    );
}

export default App;
