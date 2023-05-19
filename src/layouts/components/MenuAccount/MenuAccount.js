import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormGroup, Input } from "reactstrap";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import userApiURL from "api/userApiURL";
import Separator from "components/Separator";
import { useAxiosClient, useDarkMode } from "hooks";
import { logout } from "redux/slices/userSlice";
import routes from "routes";
import styles from "./MenuAccount.module.scss";

const cx = classNames.bind(styles);

function MenuAccount({ menuAccount }) {
    const axiosClient = useAxiosClient();

    const [darkMode, toggleDarkMode] = useDarkMode();

    const { user } = useSelector((state) => state.user);
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
                {user?.role === "admin" && (
                    <li className={cx("item")}>
                        <Link to={routes.dashboard} className={cx("item-link")}>
                            <MdOutlineAdminPanelSettings
                                className={cx("item-icon")}
                            />
                            <span className={cx("item-name")}>
                                Quản trị viên
                            </span>
                        </Link>
                    </li>
                )}

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
                                            onChange={toggleDarkMode}
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
