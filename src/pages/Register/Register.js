import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import routes from "routes";
import styles from "./Register.module.scss";
import RegisterForm from "./RegisterForm/RegisterForm";

const cx = classNames.bind(styles);

function Register() {
    return (
        <>
            <Helmet>
                <title>Đăng ký tài khoản</title>
            </Helmet>
            <div className={cx("wrapper")}>
                <h1 className={cx("title")}>Đăng ký</h1>

                <RegisterForm />

                <div className={cx("link")}>
                    Bạn đã có tài khoản?
                    <Link to={routes.login}>Đăng nhập</Link>
                </div>
            </div>
        </>
    );
}

export default Register;
