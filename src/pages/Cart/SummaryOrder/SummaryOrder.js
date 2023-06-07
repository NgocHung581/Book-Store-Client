import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Label } from "reactstrap";

import Button from "components/Button";
import Separator from "components/Separator";
import {
    checkAllItem,
    updateIsUseCount,
    updateSubTotal,
    updateTotalPrice,
} from "redux/slices/cartSlice";
import routes from "routes";
import calculateDiscountOnPoint from "utils/calculateDiscountOnPoint";
import styles from "./SummaryOrder.module.scss";

const cx = classNames.bind(styles);

function SummaryOrder() {
    const { carts, subTotal, isUsePoint, totalPrice } = useSelector(
        (state) => state.carts
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
        const isNotChosen = carts.every((cart) => cart.isChecked === false);
        if (isNotChosen)
            return toast.error("Vui lòng chọn sản phẩm cần thanh toán");
        navigate(
            { pathname: routes.checkout },
            { state: { carts, subTotal, isUsePoint, totalPrice } }
        );
    };

    const handleClickUsePoint = (e) => {
        const isChecked = e.target.checked;
        dispatch(updateIsUseCount(isChecked));
    };

    useEffect(() => {
        let subTotal = 0;
        carts.forEach((cart) => {
            if (cart.isChecked) {
                subTotal += cart?.quantity * cart?.book?.price;
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
    }, [carts, dispatch, isUsePoint, user?.point]);

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
                            checked={carts.every((cart) => cart?.isChecked)}
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
