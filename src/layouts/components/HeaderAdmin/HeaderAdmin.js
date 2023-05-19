import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge } from "reactstrap";

import userApiURL from "api/userApiURL";
import images from "assets/images";
import Button from "components/Button";
import { useAxiosClient } from "hooks";
import { logout } from "redux/slices/userSlice";
import routes from "routes";
import styles from "./HeaderAdmin.module.scss";
import ChatsAdmin from "components/ChatsAdmin";

const cx = classNames.bind(styles);

function HeaderAdmin({ showSidebar, setShowSidebar }) {
    const axiosClient = useAxiosClient();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showHeaderOnScroll, setShowHeaderOnScroll] = useState(false);

    const { user } = useSelector((state) => state.user);

    const handleLogout = async () => {
        const url = userApiURL.logout();
        const res = await axiosClient.post(url, {
            refreshToken: user?.refreshToken,
        });
        dispatch(logout());
        navigate(routes.login);
        toast.success(res.message);
    };

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
                <ChatsAdmin />
                <div className={cx("notification")}>
                    <FaRegBell size={20} />
                    <Badge color="primary" pill className={cx("badge")}>
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
                    <Button
                        text
                        className={cx("logout-btn")}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </Button>
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
