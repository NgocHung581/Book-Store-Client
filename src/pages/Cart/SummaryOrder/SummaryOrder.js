import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import Separator from "components/Separator";
import routes from "routes";
import styles from "./SummaryOrder.module.scss";
import {
    checkAllItem,
    updateIsUseCount,
    updateSubTotal,
    updateTotalPrice,
} from "redux/slices/cartSlice";
import calculateDiscountOnPoint from "utils/calculateDiscountOnPoint";

const cx = classNames.bind(styles);

function SummaryOrder() {
    const { cart, subTotal, isUsePoint, totalPrice } = useSelector(
        (state) => state.cart
    );
    const { user } = useSelector((state) => state.user);
    const [showContent, setShowContent] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1223px)" });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckAllCart = (e) => {
        dispatch(checkAllItem(e.target.checked));
    };

    const handleClickCheckout = () => {
        const isNotChosen = cart.every((item) => item.checked === false);
        if (isNotChosen)
            return toast.error("Vui lòng chọn sản phẩm cần thanh toán");
        navigate(routes.checkout);
    };

    const handleClickUsePoint = (e) => {
        const isChecked = e.target.checked;
        dispatch(updateIsUseCount(isChecked));
    };

    useEffect(() => {
        let subTotal = 0;
        cart.forEach((item) => {
            if (item.checked) {
                subTotal += item.quantity * item.price;
            }
        });
        dispatch(updateSubTotal(subTotal));
        if (isUsePoint) {
            if (subTotal === 0) {
                dispatch(updateTotalPrice(subTotal));
            } else {
                const discount = calculateDiscountOnPoint(user?.point);
                dispatch(updateTotalPrice(subTotal - discount));
            }
        } else {
            dispatch(updateTotalPrice(subTotal));
        }
    }, [cart, dispatch, isUsePoint, user?.point]);

    return (
        <div
            className={cx("wrapper", {
                fixed: isTabletOrMobile,
                sticky: !isTabletOrMobile,
            })}
        >
            <div>
                <div
                    className={
                        isTabletOrMobile
                            ? "d-flex align-items-center justify-content-between"
                            : ""
                    }
                >
                    <h4 className={cx("title")}>Thanh toán</h4>
                    {isTabletOrMobile &&
                        (showContent ? (
                            <MdKeyboardArrowUp
                                size={28}
                                onClick={() => {
                                    setShowContent(false);
                                }}
                            />
                        ) : (
                            <MdKeyboardArrowDown
                                size={28}
                                onClick={() => {
                                    setShowContent(true);
                                }}
                            />
                        ))}
                </div>

                <div className={cx("content", { show: showContent })}>
                    <div className={cx("content-group")}>
                        <span className={cx("content-group-title")}>
                            Tạm tính
                        </span>
                        <span>
                            <NumericFormat
                                value={subTotal}
                                thousandSeparator=","
                                displayType="text"
                                renderText={(value) => `${value} đ`}
                            />
                        </span>
                    </div>
                    <div className={cx("content-group")}>
                        <span className={cx("content-group-title")}>
                            Giao hàng
                        </span>
                        <span>Miễn phí</span>
                    </div>
                    <div className={cx("content-group")}>
                        <Label className={cx("content-group-title")}>
                            Điểm tích lũy ({user?.point} điểm)
                        </Label>
                        <Input
                            disabled={user?.point <= 0}
                            type="checkbox"
                            checked={isUsePoint}
                            onChange={handleClickUsePoint}
                        />
                    </div>
                    <div className={cx("content-group")}>
                        <Label className={cx("content-group-title")}>
                            Chọn tất cả
                        </Label>
                        <Input
                            type="checkbox"
                            checked={cart.every(
                                (item) => item.checked === true
                            )}
                            onChange={handleCheckAllCart}
                        />
                    </div>
                </div>
                <Separator />
                <div className={cx("total")}>
                    <span>Tổng cộng</span>
                    <span>
                        <NumericFormat
                            value={totalPrice}
                            thousandSeparator=","
                            displayType="text"
                            renderText={(value) => `${value} đ`}
                        />
                    </span>
                </div>
            </div>
            <Button
                primary
                className={cx("checkout-btn")}
                onClick={handleClickCheckout}
            >
                Thanh toán
            </Button>
        </div>
    );
}

export default SummaryOrder;
