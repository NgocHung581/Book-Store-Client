import classNames from "classnames/bind";
import TippyHeadless from "@tippyjs/react/headless";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./CartMenu.module.scss";
import Popper from "components/Popper";
import Separator from "components/Separator";
import ConfirmItem from "components/ConfirmItem";
import routes from "routes/routes";
import Button from "components/Button";
import images from "assets/images";

const cx = classNames.bind(styles);

function CartMenu({ children }) {
    const { cart } = useSelector((state) => state.cart);

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
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                to={`${routes.book}/${item.slug}`}
                                                className="w-100"
                                            >
                                                <ConfirmItem item={item} />
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
                {children}
            </TippyHeadless>
        </div>
    );
}

CartMenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartMenu;
