import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormGroup, Input } from "reactstrap";

import { logout, setDarkMode } from "redux/slices/userSlice";
import { useAxiosClient } from "hooks";
import styles from "./MenuAccount.module.scss";
import userApiURL from "api/userApiURL";
import Separator from "components/Separator";
import routes from "routes";

const cx = classNames.bind(styles);

function MenuAccount({ menuAccount }) {
    const axiosClient = useAxiosClient();

    const { user, darkMode } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const url = userApiURL.logout();
        const res = await axiosClient.post(url, {
            refreshToken: user?.refreshToken,
        });
        dispatch(logout());
        navigate(routes.login);
        toast.success(res.message);
    };

    const handleThemeChange = (e) => dispatch(setDarkMode(e.target.checked));

    return (
        <>
            <div className={cx("header")}>
                <h1 className={cx("user-name")}>{user?.fullName}</h1>
                <span className={cx("user-point", "text-muted")}>
                    Điểm tích lũy: {user?.point}
                </span>
            </div>
            <Separator />
            <ul className={cx("list")}>
                {menuAccount.map((menuItem, index) => {
                    let Icon = menuItem.icon;
                    let Component = Link;
                    if (!menuItem.path) Component = "div";

                    return (
                        <li key={index} className={cx("item")}>
                            <Component
                                to={menuItem.path}
                                className={cx("item-link")}
                            >
                                <Icon className={cx("item-icon")} />
                                <span className={cx("item-name")}>
                                    {menuItem.title}
                                </span>
                                {menuItem.darkMode && (
                                    <FormGroup
                                        switch
                                        className={cx("toggle-darkMode")}
                                    >
                                        <Input
                                            checked={darkMode}
                                            type="switch"
                                            role="switch"
                                            className={cx(
                                                "toggle-darkMode-btn"
                                            )}
                                            onChange={handleThemeChange}
                                        />
                                    </FormGroup>
                                )}
                            </Component>
                        </li>
                    );
                })}
                <li className={cx("item", "separate")} onClick={handleLogout}>
                    <div className={cx("item-link")}>
                        <BiLogOut className={cx("item-icon")} />
                        <span className={cx("item-name")}>Đăng xuất</span>
                    </div>
                </li>
            </ul>
        </>
    );
}

MenuAccount.propTypes = {
    menuAccount: PropTypes.array,
};

export default MenuAccount;
