import classNames from "classnames/bind";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Col, Row, Table } from "reactstrap";

import images from "assets/images";
import Button from "components/Button";
import CartItem from "pages/Cart/CartItem";
import routes from "routes";
import styles from "./Cart.module.scss";
import CartItemOnMobile from "./CartItemOnMobile";
import SummaryOrder from "./SummaryOrder";

const cx = classNames.bind(styles);

function Cart() {
    const isMobile = useMediaQuery({ query: "(max-width: 639px)" });
    const { carts } = useSelector((state) => state.carts);

    return (
        <>
            <Helmet>
                <title>Giỏ hàng</title>
            </Helmet>
            <div className={cx("wrapper")}>
                <h2 className={cx("title")}>Giỏ hàng</h2>
                {carts.length > 0 ? (
                    <Row>
                        <Col lg={9} md={12} xs={12}>
                            {isMobile ? (
                                <div className={cx("list")}>
                                    {carts.map((cart) => (
                                        <CartItemOnMobile
                                            key={cart?._id}
                                            item={cart}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <Table
                                        hover
                                        responsive
                                        striped
                                        className="text-center"
                                    >
                                        <thead>
                                            <tr>
                                                <th className={cx("heading")}>
                                                    #
                                                </th>
                                                <th className={cx("heading")}>
                                                    Sản phẩm
                                                </th>
                                                <th className={cx("heading")}>
                                                    Đơn giá
                                                </th>
                                                <th className={cx("heading")}>
                                                    Số lượng
                                                </th>
                                                <th className={cx("heading")}>
                                                    Tổng
                                                </th>
                                                <th
                                                    className={cx("heading")}
                                                ></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.map((cart) => (
                                                <CartItem
                                                    key={cart?._id}
                                                    item={cart}
                                                />
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Button
                                        to={routes.book}
                                        outline
                                        className="mb-3"
                                    >
                                        Tiếp tục mua sẳm
                                    </Button>
                                </>
                            )}
                        </Col>
                        <Col lg={3} md={12} xs={12}>
                            <SummaryOrder />
                        </Col>
                    </Row>
                ) : (
                    <div className={cx("cart-empty-img")}>
                        <img src={images.cartEmpty} alt="Cart Empty" />
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
