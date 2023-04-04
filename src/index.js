import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import GlobalStyles from "components/GlobalStyles";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import store from "redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <HelmetProvider>
            <Router>
                <GlobalStyles>
                    <App />
                    <ToastContainer />
                    <ScrollToTop />
                </GlobalStyles>
            </Router>
        </HelmetProvider>
    </Provider>
);
