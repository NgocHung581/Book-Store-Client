import classNames from "classnames/bind";
import { Col, Container, Row } from "reactstrap";

import images from "assets/images";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const aboutList = [
    { name: "Giới thiệu" },
    { name: "Liên hệ" },
    { name: "Cơ hội việc làm" },
];

function Footer() {
    return (
        <footer className={cx("wrapper")}>
            <Container>
                <Row>
                    <Col lg={4} md={12} xs={12}>
                        <div className={cx("logo")}>
                            <img src={images.logo} alt="Logo" />
                        </div>
                        <p className={cx("description")}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Numquam fugiat quis voluptas, animi inventore
                            ab impedit ratione corrupti? Repudiandae, enim ut
                            sapiente voluptas odio at aperiam harum ratione
                            quisquam suscipit.
                        </p>
                    </Col>
                    <Col lg={4} md={12} xs={12}>
                        <h4 className={cx("title")}>About Us</h4>
                        <ul>
                            {aboutList.map((aboutItem, index) => (
                                <li className={cx("item")} key={index}>
                                    {aboutItem.name}
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col lg={4} md={12} xs={12}>
                        <h4 className={cx("title")}>Contact Us</h4>
                        <ul className={cx("list")}>
                            <li className={cx("item")}>
                                Thành phồ Hồ Chí Minh, Việt Nam
                            </li>
                            <li className={cx("item")}>
                                Email: email@gmail.com
                            </li>
                            <li className={cx("item")}>Phone: 0123456789</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
