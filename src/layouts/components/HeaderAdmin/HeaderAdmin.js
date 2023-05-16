import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { Badge } from "reactstrap";
import { useSelector } from "react-redux";

import styles from "./HeaderAdmin.module.scss";
import images from "assets/images";

const cx = classNames.bind(styles);

function HeaderAdmin({ showSidebar, setShowSidebar }) {
    const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false);

    const { user } = useSelector((state) => state.user);

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
        <div className={cx("wrapper", { scroll: showHeaderOnScroll })}>
            <div className={cx("left")}>
                <div className={cx("logo")}>
                    <img src={images.logo} alt="Logo" />
                </div>
                <div
                    className={cx("hamburger-menu", { show: showSidebar })}
                    onClick={() => setShowSidebar((prev) => !prev)}
                >
                    <div className={cx("line")}></div>
                </div>
            </div>
            <div className={cx("right")}>
                <div className={cx("notification")}>
                    <BsBell size={20} />
                    <Badge
                        color="primary"
                        pill
                        className={cx("notification-badge")}
                    >
                        99
                    </Badge>
                </div>
                <div className={cx("user")}>
                    <div className={cx("user-avatar")}>
                        <img
                            src={
                                user?.avatar
                                    ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${user?.avatar}`
                                    : images.user
                            }
                            alt="Avatar"
                        />
                    </div>
                    <span className={cx("user-name")}>{user?.fullName}</span>
                    <div className={cx("user-icon")}>
                        <MdOutlineKeyboardArrowDown size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}

HeaderAdmin.propTypes = {
    showSidebar: PropTypes.bool,
    setShowSidebar: PropTypes.func,
};

export default HeaderAdmin;
