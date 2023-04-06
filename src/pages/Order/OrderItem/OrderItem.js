import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "components/Button";
import ConfirmItem from "components/ConfirmItem";
import Separator from "components/Separator";
import styles from "./OrderItem.module.scss";
import routes from "routes";
import { useAxiosAuth } from "hooks";
import orderApiURL from "api/orderApiURL";

const cx = classNames.bind(styles);

function OrderItem({ order: orderInit }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);
    const [modalDetail, setModalDetail] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [order, setOrder] = useState(orderInit);

    const toggleModalCustomerInfo = () => setModalDetail((prev) => !prev);

    const toggleModalConfirm = () => setModalConfirm((prev) => !prev);

    const handleUpdateStatusOrder = async (status) => {
        const url = orderApiURL.updateStatus(order?._id);
        const res = await axiosAuth.put(
            url,
            { status },
            {
                headers: { authorization: `Bearer ${user?.accessToken}` },
            }
        );
        setOrder(res.data);
        setModalConfirm(false);
        toast.success(res.message);
    };

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <span className={cx("id")}>Mã đơn hàng: {order?._id}</span>
                    <span
                        className={cx("status", {
                            success: order?.status?._id === 5,
                        })}
                    >
                        {order?.status?.label}
                    </span>
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
                        {order?.status?._id === 2 && (
                            <Button primary onClick={toggleModalConfirm}>
                                Hủy đơn hàng
                            </Button>
                        )}
                        {order?.status?._id === 3 && ""}
                        {order?.status?._id === 4 && (
                            <Button
                                primary
                                onClick={() => handleUpdateStatusOrder(5)}
                            >
                                Đã nhận hàng
                            </Button>
                        )}
                        {order?.status?._id === 5 && (
                            <>
                                <span
                                    className="text-muted me-3"
                                    style={{ fontSize: "14px" }}
                                >
                                    Đánh giá ngay để nhận thêm 5 điểm tích lũy
                                </span>
                                <Button primary>Đánh giá</Button>
                            </>
                        )}
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
                    <Button primary onClick={() => handleUpdateStatusOrder(6)}>
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
