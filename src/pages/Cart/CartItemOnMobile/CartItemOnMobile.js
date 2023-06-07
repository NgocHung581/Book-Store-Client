import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Col, Input, Row } from "reactstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Button from "components/Button";
import styles from "./CartItemOnMobile.module.scss";
import { updateQuantity } from "redux/slices/cartSlice";

const cx = classNames.bind(styles);

function CartItemOnMobile({ item }) {
    const dispatch = useDispatch();

    const handleChangeQuantity = (e) => {
        const payload = { id: item.id, quantity: parseInt(e.target.value) };
        const updatedItem = updateQuantity(payload);
        dispatch(updatedItem);
        toast.success("Cập nhật giỏ hàng thành công");
    };

    return (
        <div className={cx("wrapper")}>
            <Row className="align-items-center">
                <Col xs={1}>
                    <Input type="checkbox" />
                </Col>
                <Col xs={3}>
                    <div className={cx("img")}>
                        <img
                            src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${item?.book?.image}`}
                            alt="Sách"
                        />
                    </div>
                </Col>
                <Col xs={6}>
                    <div className={cx("info")}>
                        <span className={cx("name")}>{item?.book?.name}</span>
                        <strong className={cx("price")}>
                            <NumericFormat
                                value={item?.book?.price}
                                thousandSeparator=","
                                displayType="text"
                                renderText={(value) => `${value} đ`}
                            />
                        </strong>
                        <div>
                            <Input
                                type="number"
                                className={cx("quantity")}
                                min={1}
                                value={item.quantity}
                                onChange={handleChangeQuantity}
                            />
                        </div>
                        <div>
                            Tổng:{" "}
                            <strong className={cx("total")}>
                                <NumericFormat
                                    value={item?.book?.price * item.quantity}
                                    thousandSeparator=","
                                    displayType="text"
                                    renderText={(value) => `${value} đ`}
                                />
                            </strong>
                        </div>
                    </div>
                </Col>
                <Col xs={2}>
                    <div className="text-center">
                        <Button outline className={cx("delete-btn")}>
                            <BsFillTrashFill />
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

CartItemOnMobile.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItemOnMobile;
