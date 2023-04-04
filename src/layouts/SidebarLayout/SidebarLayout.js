import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import Header from "layouts/components/Header";
import Sidebar from "layouts/components/Sidebar";
import Footer from "layouts/components/Footer";
import styles from "./SidebarLayout.module.scss";

const cx = classNames.bind(styles);

function SidebarLayout() {
    return (
        <>
            <Header />
            <div className={cx("content")}>
                <Container className="h-100">
                    <Row className="h-100">
                        <Col lg={3} md={12}>
                            <Sidebar />
                        </Col>
                        <Col lg={9} md={12}>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default SidebarLayout;
