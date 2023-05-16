import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Button from "components/Button";
import styles from "./OrderItem.module.scss";
import routes from "routes";
import Separator from "components/Separator";
import ConfirmItem from "components/ConfirmItem/ConfirmItem";

const cx = classNames.bind(styles);

function OrderItem({ order, index }) {
    const [detailModal, setDetailModal] = useState(false);

    const toggleDetailModal = () => setDetailModal((prev) => !prev);

    console.log(order);

    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{order?._id}</td>
                <td>
                    <Button
                        text
                        className={cx("detail")}
                        onClick={toggleDetailModal}
                    >
                        Xem chi tiết
                    </Button>
                </td>
                <td>
                    <NumericFormat
                        value={order?.totalPrice}
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => `${value} đ`}
                    />
                </td>
                <td>
                    <span className={cx("status")}>{order?.status?.label}</span>
                </td>
                <td>
                    <Link
                        to={`${routes.manageOrder}/update/${order?._id}`}
                        state={{ status: order?.status?._id }}
                    >
                        <MdOutlineModeEditOutline
                            size={20}
                            className={cx("edit-icon")}
                        />
                    </Link>
                </td>
            </tr>

            {/* Info Modal */}
            <Modal
                isOpen={detailModal}
                toggle={toggleDetailModal}
                centered
                scrollable
                size="lg"
            >
                <ModalHeader toggle={toggleDetailModal}>
                    Chi tiết đơn hàng
                </ModalHeader>
                <ModalBody>
                    <h4 className={cx("title")}>Thông tin khách hàng</h4>
                    <div className="d-flex align-items-center gap-2">
                        <label>
                            Họ tên: {order?.shippingInformation?.fullName}
                        </label>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label>
                            Email: {order?.shippingInformation?.email}
                        </label>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label>
                            Địa chỉ: {order?.shippingInformation?.address}
                        </label>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label>
                            Số điện thoại: {order?.shippingInformation?.phone}
                        </label>
                    </div>
                    <Separator />
                    <div>
                        <h4 className={cx("title")}>
                            Thông tin sản phẩm ({order?.orderItems?.length})
                        </h4>
                        <div>
                            {order?.orderItems?.map((item) => (
                                <ConfirmItem key={item?.id} item={item} lg />
                            ))}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center">
                            <label
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "500",
                                }}
                                className="me-2"
                            >
                                Tổng tiền:
                            </label>
                            <span
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "500",
                                    color: "var(--primary-color)",
                                }}
                            >
                                <NumericFormat
                                    value={order?.totalPrice}
                                    thousandSeparator=","
                                    displayType="text"
                                    renderText={(value) => `${value} đ`}
                                />
                            </span>
                        </div>
                        <Button primary onClick={toggleDetailModal}>
                            Đóng
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default OrderItem;
