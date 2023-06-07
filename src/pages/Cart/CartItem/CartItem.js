import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "reactstrap";

import cartApiURL from "api/cartApiURL";
import Button from "components/Button";
import { useAxiosAuth } from "hooks";
import { checkItem, deleteCart, updateQuantity } from "redux/slices/cartSlice";
import styles from "./CartItem.module.scss";

const cx = classNames.bind(styles);

function CartItem({ item }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(item?.quantity);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1);
        setIsUpdate(true);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
        setIsUpdate(true);
    };

    const handleDeleteCart = async () => {
        const url = cartApiURL.delete({ id: item?._id });
        const res = await axiosAuth.delete(url, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
        dispatch(deleteCart(res.data));
        toast.success(res.message);
    };

    const handleCheckItem = () => {
        dispatch(checkItem(item?._id));
    };

    useEffect(() => {
        if (isUpdate) {
            const updateCart = async () => {
                const url = cartApiURL.getAllOrAddOrUpdate();
                const data = { bookId: item?.book?._id, quantity };
                const res = await axiosAuth.put(url, data, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                toast.success(res.message);
                dispatch(updateQuantity(res.data));
            };

            updateCart();
            setIsUpdate(false);
        }
    }, [
        user?.accessToken,
        item?.book?._id,
        quantity,
        isUpdate,
        dispatch,
        axiosAuth,
    ]);

    return (
        <tr className={cx("wrapper")}>
            <th scope="row" className="py-4">
                <Input
                    type="checkbox"
                    checked={item?.isChecked}
                    onChange={handleCheckItem}
                />
            </th>
            <td className="py-4">
                <div className={cx("info")}>
                    <div className={cx("img")}>
                        <img
                            src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${item?.book?.image}`}
                            alt="Sách"
                        />
                    </div>
                    <div className={cx("name")}>{item?.book?.name}</div>
                </div>
            </td>
            <td className="py-4">
                <div className={cx("price")}>
                    <NumericFormat
                        value={item?.book?.price}
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => `${value} đ`}
                    />
                </div>
            </td>
            <td className="py-4">
                <div className={cx("quantity")}>
                    <span
                        className={cx("minus")}
                        onClick={handleDecreaseQuantity}
                    >
                        <AiOutlineMinus />
                    </span>
                    <span className={cx("num")}>{item?.quantity}</span>
                    <span
                        className={cx("plus")}
                        onClick={handleIncreaseQuantity}
                    >
                        <AiOutlinePlus />
                    </span>
                </div>
            </td>
            <td className="py-4">
                <div className={cx("price")}>
                    <NumericFormat
                        value={item?.book?.price * item?.quantity}
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => `${value} đ`}
                    />
                </div>
            </td>
            <td className="py-4">
                <Button
                    outline
                    className={cx("actions")}
                    onClick={handleDeleteCart}
                >
                    <BsFillTrashFill />
                </Button>
            </td>
        </tr>
    );
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItem;
