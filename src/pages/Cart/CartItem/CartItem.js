import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BsFillTrashFill } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "reactstrap";

import Button from "components/Button";
import { checkItem, deleteCart, updateQuantity } from "redux/slices/cartSlice";
import styles from "./CartItem.module.scss";

const cx = classNames.bind(styles);

function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleChangeQuantity = (e) => {
        const value = e.target.value;

        const payload = { id: item.id, quantity: parseInt(value) };
        const updatedItem = updateQuantity(payload);
        dispatch(updatedItem);
        toast.success("Cập nhật giỏ hàng thành công");
    };

    const handleDeleteCart = () => {
        dispatch(deleteCart(item.id));
        toast.success("Bạn vừa xóa 1 sản phẩm khỏi giỏ hàng");
    };

    const handleCheckItem = (e) => {
        const payload = { id: item.id, checked: e.target.checked };
        dispatch(checkItem(payload));
    };

    return (
        <tr className={cx("wrapper")}>
            <th scope="row" className="py-4">
                <Input
                    type="checkbox"
                    checked={item.checked}
                    onChange={handleCheckItem}
                />
            </th>
            <td className="py-4">
                <div className={cx("info")}>
                    <div className={cx("img")}>
                        <img
                            src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${item.image}`}
                            alt="Sách"
                        />
                    </div>
                    <div className={cx("name")}>{item.name}</div>
                </div>
            </td>
            <td className="py-4">
                <div className={cx("price")}>
                    <NumericFormat
                        value={item.price}
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => `${value} đ`}
                    />
                </div>
            </td>
            <td className="py-4">
                <Input
                    type="number"
                    className={cx("quantity")}
                    min={1}
                    value={item.quantity}
                    onChange={handleChangeQuantity}
                />
            </td>
            <td className="py-4">
                <div className={cx("price")}>
                    <NumericFormat
                        value={item.price * item.quantity}
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
