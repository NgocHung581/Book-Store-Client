import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosClient } from "hooks";
import routes from "routes";
import equalTo from "utils/validation/equalTo";
import styles from "./ResetPassword.module.scss";

const cx = classNames.bind(styles);

function ResetPassword() {
    const axiosClient = useAxiosClient();
    const { state } = useLocation();
    const navigate = useNavigate();

    Yup.addMethod(Yup.string, "equalTo", equalTo);

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, "Vui lòng nhập tối thiểu 6 ký tự")
            .required("Vui lòng nhập trường này"),
        passwordConfirm: Yup.string()
            .equalTo(Yup.ref("password"))
            .required("Vui lòng nhập trường này"),
    });

    const initialValues = { password: "", passwordConfirm: "" };

    const handleSubmitForm = async ({ password }) => {
        const data = { email: state.email, password };
        const url = userApiURL.resetPassword(data);
        const res = await axiosClient.post(url, data);

        if (res.error) return toast.error(res.error);

        toast.success(res.message);
        navigate(routes.login);
    };

    if (!state) {
        toast.error("Vui lòng nhập email");
        return <Navigate to={routes.login} />;
    }

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>Tạo mới mật khẩu</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <FastField
                                name="password"
                                component={InputField}
                                placeholder="Mật khẩu mới"
                                type="password"
                            />
                            <FastField
                                name="passwordConfirm"
                                component={InputField}
                                placeholder="Nhập lại mật khẩu"
                                type="password"
                            />
                            <Button
                                type="submit"
                                primary
                                className={cx("submit-btn")}
                            >
                                Đổi mật khẩu
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
            <div>
                <Link to={routes.login} className={cx("link")}>
                    <HiOutlineArrowLongLeft size={20} />{" "}
                    <span className="ms-1">Đăng nhập</span>
                </Link>
            </div>
        </div>
    );
}

export default ResetPassword;
