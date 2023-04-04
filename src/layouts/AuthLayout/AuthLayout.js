import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss";

const cx = classNames.bind(styles);

function AuthLayout() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("form")}>
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
