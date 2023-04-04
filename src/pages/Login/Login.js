import images from "assets/images";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import routes from "routes";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
    const [user, setUser] = useState({});

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>
                {user?.fullName ? `Xin chào, ${user?.fullName}` : "Đăng nhập"}
            </h1>
            <div className={cx("user-avatar")}>
                <img
                    src={
                        user?.avatar
                            ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${user?.avatar}`
                            : images.user
                    }
                    alt={user?.fullName}
                />
            </div>

            <Outlet context={[user, setUser]} />

            <div className={cx("link")}>
                Bạn chưa có tài khoản?
                <Link to={routes.register}>Đăng ký</Link>
            </div>
        </div>
    );
}

export default Login;
