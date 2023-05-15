import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { MdOutlineAnalytics, MdOutlineNoteAlt } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";

import routes from "routes";
import styles from "./SidebarAdmin.module.scss";

const cx = classNames.bind(styles);

const NAV_LIST = [
    { label: "Xem cửa hàng", Icon: AiOutlineHome, path: routes.home },
    { label: "Bảng tin", Icon: MdOutlineAnalytics, path: routes.dashboard },
    { label: "Quản lý sản phẩm", Icon: BsBook, path: routes.manageProduct },
    {
        label: "Quản lý danh mục",
        Icon: BiCategory,
        path: routes.manageCategory,
    },
    {
        label: "Quản lý đơn hàng",
        Icon: MdOutlineNoteAlt,
        path: routes.manageOrder,
    },
    {
        label: "Quản lý người dùng",
        Icon: HiOutlineUser,
        path: routes.manageUser,
    },
];

function SidebarAdmin({ showSidebar }) {
    return (
        <div
            className={cx("wrapper", { close: !showSidebar })}
            style={{
                "--sidebar-admin-width": showSidebar ? "240px" : "60px",
            }}
        >
            <div className={cx("line")}></div>
            <div className={cx("nav-list")}>
                {NAV_LIST.map(({ path, Icon, label }, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) =>
                            cx("nav-item", {
                                active: isActive,
                            })
                        }
                    >
                        <div className={cx("nav-item-icon")}>
                            <Icon size={20} />
                        </div>
                        <span className={cx("nav-item-label")}>{label}</span>
                        <div className={cx("nav-item-line")}></div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

SidebarAdmin.propTypes = {
    showSidebar: PropTypes.bool,
};

export default SidebarAdmin;
