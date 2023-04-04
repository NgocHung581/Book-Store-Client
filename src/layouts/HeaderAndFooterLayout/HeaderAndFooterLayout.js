import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import styles from "./HeaderAndFooterLayout.module.scss";

const cx = classNames.bind(styles);

function HeaderAndFooterLayout() {
    return (
        <>
            <Header />
            <div className={cx("content")}>
                <Container className="h-100">
                    <Outlet />
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default HeaderAndFooterLayout;
