import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import HeaderAdmin from "layouts/components/HeaderAdmin";
import SidebarAdmin from "layouts/components/SidebarAdmin";
import styles from "./AdminLayout.module.scss";

const cx = classNames.bind(styles);

function AdminLayout() {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div>
            <HeaderAdmin
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div className="d-flex">
                <SidebarAdmin showSidebar={showSidebar} />
                <div
                    className={cx("main")}
                    style={{
                        "--sidebar-admin-width": showSidebar ? "240px" : "60px",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
