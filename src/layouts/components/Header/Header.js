import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { Link, NavLink } from "react-router-dom";
import { Badge, Col, Container, Row } from "reactstrap";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";

import { MENU_ACCOUNT, MENU_ACCOUNT_MOBILE, NAV_LIST } from "constants";
import images from "assets/images";
import routes from "routes";
import Search from "../Search";
import User from "../User";
import styles from "./Header.module.scss";
import CartMenu from "../CartMenu";

const cx = classNames.bind(styles);

function Header() {
    const isMobile = useMediaQuery({ query: "(max-width: 639px)" });
    const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        const handleHeaderOnScroll = () => {
            return window.scrollY > 0
                ? setShowHeaderOnScroll(true)
                : setShowHeaderOnScroll(false);
        };

        window.addEventListener("scroll", handleHeaderOnScroll);

        return () => window.removeEventListener("scroll", handleHeaderOnScroll);
    });

    return (
        <header className={cx("wrapper", { scroll: showHeaderOnScroll })}>
            <div className={cx("top")}>
                <Container className="h-100">
                    <div className={cx("top-content")}>
                        <div className={cx("logo")}>
                            <Link to={routes.home} className={cx("logo-link")}>
                                <img src={images.logo} alt="Logo" />
                            </Link>
                        </div>

                        {isMobile ? (
                            <div className={cx("actions-mobile")}>
                                <Search />
                                <div className="d-flex align-items-center">
                                    <Link
                                        to={routes.cart}
                                        className={cx(
                                            "actions-mobile-link",
                                            "actions-mobile-cart"
                                        )}
                                    >
                                        <IoCartOutline size={24} />
                                        <Badge
                                            className={cx("actions-item-badge")}
                                            pill
                                        >
                                            {cart.length}
                                        </Badge>
                                    </Link>
                                    {user ? (
                                        <User
                                            menuAccount={MENU_ACCOUNT_MOBILE}
                                        />
                                    ) : (
                                        <Link
                                            to={routes.login}
                                            className={cx(
                                                "actions-mobile-link"
                                            )}
                                        >
                                            <BiUser size={24} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Search />

                                <div className={cx("actions")}>
                                    <Tippy content="Danh sách yêu thích">
                                        <div className={cx("actions-item")}>
                                            <Link to={routes.wishlist}>
                                                <BsHeart size={20} />
                                            </Link>
                                        </div>
                                    </Tippy>
                                    <CartMenu>
                                        <div className={cx("actions-item")}>
                                            <Link to={routes.cart}>
                                                <IoCartOutline size={20} />
                                                <Badge
                                                    className={cx(
                                                        "actions-item-badge"
                                                    )}
                                                    pill
                                                >
                                                    {cart.length}
                                                </Badge>
                                            </Link>
                                        </div>
                                    </CartMenu>

                                    {user ? (
                                        <User menuAccount={MENU_ACCOUNT} />
                                    ) : (
                                        <Tippy
                                            disabled={user}
                                            content="Đăng nhập"
                                        >
                                            <div className={cx("actions-item")}>
                                                <Link to={routes.login}>
                                                    <BiUser size={20} />
                                                </Link>
                                            </div>
                                        </Tippy>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </div>
            <div className={cx("bottom")}>
                <Container className="h-100">
                    <Row className="h-100">
                        <Col lg={12}>
                            <nav className={cx("bottom-nav")}>
                                {NAV_LIST.map((navItem, index) => (
                                    <NavLink
                                        key={index}
                                        end
                                        to={navItem.path}
                                        className={({ isActive }) =>
                                            cx("bottom-nav-item", {
                                                active: isActive,
                                            })
                                        }
                                    >
                                        {navItem.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </div>
        </header>
    );
}

export default Header;
