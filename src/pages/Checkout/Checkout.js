import classNames from "classnames/bind";
import { Helmet } from "react-helmet-async";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Col, Row } from "reactstrap";

import Separator from "components/Separator";
import calculateDiscountOnPoint from "utils/calculateDiscountOnPoint";
import styles from "./Checkout.module.scss";
import CheckoutForm from "./CheckoutForm";
import ConfirmItem from "./ConfirmItem";

const cx = classNames.bind(styles);

function Checkout() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const { cart, isUsePoint, subTotal, totalPrice } = useSelector(
        (state) => state.cart
    );
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <Helmet>
                <title>Thanh toán</title>
            </Helmet>
            <div className={cx("wrapper")}>
                {isTabletOrMobile && (
                    <>
                        <h2 className={cx("title", "mb-0")}>Thanh toán</h2>
                        <Separator />
                    </>
                )}
                <Row className={isTabletOrMobile ? "flex-column-reverse" : ""}>
                    <Col lg={7} md={12} xs={12}>
                        {!isTabletOrMobile && (
                            <h2 className={cx("title")}>Thanh toán</h2>
                        )}
                        <Separator />
                        <CheckoutForm />
                    </Col>
                    <Col lg={5} md={12} xs={12}>
                        <div className={cx("preview")}>
                            <div>
                                {cart.map(
                                    (item) =>
                                        item.checked && (
                                            <ConfirmItem
                                                key={item.id}
                                                item={item}
                                            />
                                        )
                                )}
                            </div>
                            <Separator />
                            <div className={cx("preview-content")}>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span
                                        className={cx("preview-content-title")}
                                    >
                                        Tạm tính
                                    </span>
                                    <span
                                        className={cx("preview-content-price")}
                                    >
                                        <NumericFormat
                                            value={subTotal}
                                            thousandSeparator=","
                                            displayType="text"
                                            renderText={(value) => `${value} đ`}
                                        />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span
                                        className={cx("preview-content-title")}
                                    >
                                        Sử dụng điểm tích lũy
                                    </span>
                                    <span
                                        className={cx("preview-content-price")}
                                    >
                                        {isUsePoint ? (
                                            <NumericFormat
                                                value={calculateDiscountOnPoint(
                                                    user?.point
                                                )}
                                                thousandSeparator=","
                                                displayType="text"
                                                renderText={(value) =>
                                                    `- ${value} đ`
                                                }
                                            />
                                        ) : (
                                            "Không sử dụng"
                                        )}
                                    </span>
                                </div>
                            </div>
                            <Separator />
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <span className={cx("preview-total-title")}>
                                    Tổng cộng
                                </span>
                                <span className={cx("preview-total-price")}>
                                    <NumericFormat
                                        value={totalPrice}
                                        thousandSeparator=","
                                        displayType="text"
                                        renderText={(value) => `${value} đ`}
                                    />
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Checkout;
