import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

import cartApiURL from "api/cartApiURL";
import images from "assets/images";
import Button from "components/Button";
import ConfirmItem from "components/ConfirmItem";
import Popper from "components/Popper";
import Separator from "components/Separator";
import { useAxiosAuth } from "hooks";
import { fetchCarts } from "redux/slices/cartSlice";
import routes from "routes";
import styles from "./CartMenu.module.scss";

const cx = classNames.bind(styles);

function CartMenu() {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);
    const { carts } = useSelector((state) => state.carts);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCartsList = async () => {
            const url = cartApiURL.getAllOrAddOrUpdate();
            const res = await axiosAuth.get(url, {
                headers: { Authorization: `Bearer ${user?.accessToken}` },
            });
            const cartsList = res.data.map((cart) => ({
                ...cart,
                isChecked: false,
            }));
            dispatch(fetchCarts(cartsList));
        };

        fetchCartsList();
    }, [user?.accessToken, dispatch, axiosAuth]);

    return (
        <div>
            <TippyHeadless
                interactive
                offset={[5, 20]}
                placement="top-end"
                delay={[300, 300]}
                render={(attrs) => (
                    <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
                        <Popper>
                            <h5 className={cx("title")}>Giỏ hàng</h5>
                            <Separator />
                            <ul className={cx("list")}>
                                {carts.length > 0 ? (
                                    carts.map((cart) => (
                                        <li key={cart._id}>
                                            <Link
                                                to={`${routes.book}/${cart?.book?.slug}`}
                                                className="w-100"
                                            >
                                                <ConfirmItem item={cart} />
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <div className={cx("cart-empty-img")}>
                                        <img
                                            src={images.cartEmpty}
                                            alt="Cart Empty"
                                        />
                                    </div>
                                )}
                            </ul>
                            <Separator />
                            <div className={cx("footer")}>
                                <Button
                                    to={routes.cart}
                                    outline
                                    className={cx("view-cart-btn")}
                                >
                                    Xem giỏ hàng
                                </Button>
                            </div>
                        </Popper>
                    </div>
                )}
            >
                <div className={cx("actions-item")}>
                    <Link to={routes.cart}>
                        <IoCartOutline size={20} />
                        <Badge className={cx("actions-item-badge")} pill>
                            {carts.length}
                        </Badge>
                    </Link>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default CartMenu;
