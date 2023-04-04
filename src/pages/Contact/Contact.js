import classNames from "classnames/bind";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { HiLocationMarker } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Helmet } from "react-helmet-async";

import styles from "./Contact.module.scss";
import Button from "components/Button";

const cx = classNames.bind(styles);

function Contact() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1223px)" });

    return (
        <>
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <div className={cx("wrapper")}>
                <div className={cx("location")}>
                    <iframe
                        title="Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.787818269924!2d106.69783271531625!3d10.827543461207583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBWxINuIExhbmc!5e0!3m2!1svi!2s!4v1678031846696!5m2!1svi!2s"
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="ratio ratio-16x9"
                    ></iframe>
                </div>
                <div className={cx("content")}>
                    <Row>
                        <Col
                            lg={6}
                            md={12}
                            xs={12}
                            className={isTabletOrMobile ? "" : "pe-5"}
                        >
                            <h4 className={cx("title")}>Liên hệ</h4>
                            <Form>
                                <FormGroup className={cx("form-group")}>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder=" "
                                    />
                                    <Label for="fullName">Họ và tên</Label>
                                </FormGroup>
                                <FormGroup className={cx("form-group")}>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder=" "
                                    />
                                    <Label for="email">Email</Label>
                                </FormGroup>
                                <FormGroup className={cx("form-group")}>
                                    <Input
                                        id="phone"
                                        type="text"
                                        placeholder=" "
                                    />
                                    <Label for="phone">Số điện thoại</Label>
                                </FormGroup>
                                <FormGroup className={cx("form-group")}>
                                    <Input
                                        id="content"
                                        type="textarea"
                                        placeholder=" "
                                    />
                                    <Label for="content">Nội dung</Label>
                                </FormGroup>
                                <Button primary className={cx("send-btn")}>
                                    Gửi
                                </Button>
                            </Form>
                        </Col>
                        <Col
                            lg={6}
                            md={12}
                            xs={12}
                            className={isTabletOrMobile ? "mt-4" : ""}
                        >
                            <h4 className={cx("title")}>
                                Thông tin về chúng tôi
                            </h4>
                            <ul>
                                <li className="mb-2">
                                    <HiLocationMarker
                                        size={20}
                                        color="#525252"
                                    />
                                    <span className="ms-2">
                                        Thành phố Hồ Chí Minh, Việt Nam
                                    </span>
                                </li>
                                <li className="mb-2">
                                    <FaPhoneAlt size={20} color="#525252" />
                                    <span className="ms-2">0123456789</span>
                                </li>
                                <li className="mb-2">
                                    <MdEmail size={20} color="#525252" />
                                    <span className="ms-2">
                                        email@gmail.com
                                    </span>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Contact;
