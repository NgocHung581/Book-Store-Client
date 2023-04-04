import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Table } from "reactstrap";

import orderApiURL from "api/orderApiURL";
import ConfirmItem from "components/ConfirmItem";
import Separator from "components/Separator";
import { useAxiosAuth } from "hooks";
import routes from "routes";
import styles from "./OrderDetail.module.scss";

const cx = classNames.bind(styles);

function OrderDetail() {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);
    const [order, setOrder] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            const url = orderApiURL.get(id);
            const res = await axiosAuth.get(url, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`,
                },
            });
            setOrder(res.data);
        };

        fetchOrder();
    }, [id, user?.accessToken, axiosAuth]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("back-btn")} onClick={() => navigate(-1)}>
                    <MdKeyboardArrowLeft size={24} />
                    <span>Trở lại</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className={cx("orderID")}>
                        Mã đơn hàng: {order?._id}
                    </span>
                    {"|"}
                    <span className={cx("status")}>{order?.status}</span>
                </div>
            </div>
            <Separator />
            <div className={cx("body")}>
                <Row>
                    <Col lg={6}>
                        <div className={cx("customer-info")}>
                            <span className={cx("customer-info-title")}>
                                Địa chỉ nhận hàng
                            </span>
                            <div className={cx("customer-info-group")}>
                                <span
                                    className={cx(
                                        "customer-info-content",
                                        "fullName"
                                    )}
                                >
                                    {order?.shippingInformation?.fullName}
                                </span>
                                <span className={cx("customer-info-content")}>
                                    {order?.shippingInformation?.phone}
                                </span>
                                <span className={cx("customer-info-content")}>
                                    {order?.shippingInformation?.email}
                                </span>
                                <span className={cx("customer-info-content")}>
                                    {order?.shippingInformation?.address}
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx("order-info")}>
                            <span className={cx("order-info-title")}>
                                Thông tin thanh toán
                            </span>
                            <Table bordered className="align-middle">
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            <span
                                                className={cx(
                                                    "order-info-label"
                                                )}
                                            >
                                                Tổng tiền hàng
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={cx(
                                                    "order-info-price"
                                                )}
                                            >
                                                <NumericFormat
                                                    value={order?.itemsPrice}
                                                    thousandSeparator=","
                                                    displayType="text"
                                                    renderText={(value) =>
                                                        `${value} đ`
                                                    }
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <span
                                                className={cx(
                                                    "order-info-label"
                                                )}
                                            >
                                                Giảm giá từ cửa hàng
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={cx(
                                                    "order-info-price"
                                                )}
                                            >
                                                <NumericFormat
                                                    value={order?.discount}
                                                    thousandSeparator=","
                                                    displayType="text"
                                                    renderText={(value) =>
                                                        `- ${value} đ`
                                                    }
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <span
                                                className={cx(
                                                    "order-info-label"
                                                )}
                                            >
                                                Thành tiền
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={cx(
                                                    "order-info-price",
                                                    "total-price"
                                                )}
                                            >
                                                <NumericFormat
                                                    value={order?.totalPrice}
                                                    thousandSeparator=","
                                                    displayType="text"
                                                    renderText={(value) =>
                                                        `${value} đ`
                                                    }
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <span
                                                className={cx(
                                                    "order-info-label"
                                                )}
                                            >
                                                Phương thức thanh toán
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={cx(
                                                    "order-info-price"
                                                )}
                                            >
                                                Thanh toán khi nhận hàng
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Separator />
                <div className={cx("list")}>
                    {order?.orderItems?.map((item) => (
                        <Link
                            key={item.id}
                            className="d-block"
                            to={`${routes.book}/${item?.slug}`}
                        >
                            <ConfirmItem item={item} lg />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
