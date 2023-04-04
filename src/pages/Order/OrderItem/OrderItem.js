import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";

import Button from "components/Button";
import ConfirmItem from "components/ConfirmItem";
import Separator from "components/Separator";
import styles from "./OrderItem.module.scss";
import routes from "routes";

const cx = classNames.bind(styles);

function OrderItem({ order }) {
    const [modalDetail, setModalDetail] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    const toggleModalCustomerInfo = () => setModalDetail((prev) => !prev);

    const toggleModalConfirm = () => setModalConfirm((prev) => !prev);

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <span className={cx("id")}>Mã đơn hàng: {order?._id}</span>
                    <span className={cx("status")}>{order?.status}</span>
                </div>
                <Separator />
                <div className={cx("body")}>
                    <Link
                        className="d-block"
                        to={`${routes.order}/${order._id}`}
                    >
                        {order?.orderItems.map((item) => (
                            <ConfirmItem key={item.id} item={item} lg />
                        ))}
                    </Link>
                </div>
                <Separator />
                <div className={cx("footer")}>
                    <div className="d-flex align-items-center justify-content-between py-4">
                        <span
                            className={cx("customer-info")}
                            onClick={toggleModalCustomerInfo}
                        >
                            Địa chỉ nhận hàng
                        </span>
                        <div className={cx("total")}>
                            <span className={cx("total-label")}>
                                Thành tiền:
                            </span>
                            <span className={cx("total-price")}>
                                <NumericFormat
                                    value={order?.totalPrice}
                                    thousandSeparator=","
                                    displayType="text"
                                    renderText={(value) => `${value} đ`}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="text-end">
                        <Button primary onClick={toggleModalConfirm}>
                            Hủy đơn hàng
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal detail */}
            <Modal
                isOpen={modalDetail}
                toggle={toggleModalCustomerInfo}
                centered
                scrollable
            >
                <ModalHeader
                    toggle={toggleModalCustomerInfo}
                    className={cx("modal-header")}
                >
                    Thông tin khách hàng
                </ModalHeader>
                <ModalBody className={cx("modal-body")}>
                    <div className={cx("info-group")}>
                        <span className={cx("info-label")}>Người nhận:</span>
                        <span className={cx("info-content")}>
                            {order?.shippingInformation.fullName}
                        </span>
                    </div>
                    <div className={cx("info-group")}>
                        <span className={cx("info-label")}>Email:</span>
                        <span className={cx("info-content")}>
                            {order?.shippingInformation.email}
                        </span>
                    </div>
                    <div className={cx("info-group")}>
                        <span className={cx("info-label")}>Số điện thoại:</span>
                        <span className={cx("info-content")}>
                            {order?.shippingInformation.phone}
                        </span>
                    </div>
                    <div className={cx("info-group")}>
                        <span className={cx("info-label")}>
                            Địa chỉ nhận hàng:
                        </span>
                        <span className={cx("info-content")}>
                            {order?.shippingInformation.address}
                        </span>
                    </div>
                    <div className={cx("info-group")}>
                        <span className={cx("info-label")}>Ngày đặt:</span>
                        <span className={cx("info-content")}>
                            {order?.date}
                        </span>
                    </div>
                </ModalBody>
                <ModalFooter className={cx("modal-footer")}>
                    <Button primary onClick={toggleModalCustomerInfo}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal confirm */}
            <Modal isOpen={modalConfirm} toggle={toggleModalConfirm}>
                <ModalHeader toggle={toggleModalConfirm}>
                    Xác nhận hủy đơn hàng
                </ModalHeader>
                <ModalBody>
                    Bạn có chắc chắn muốn xóa đơn hàng này không?
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={toggleModalConfirm}>
                        Hủy
                    </Button>
                    <Button primary onClick={toggleModalConfirm}>
                        Xác nhận
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
};

export default OrderItem;
