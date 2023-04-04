import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormGroup, FormText } from "reactstrap";
import * as Yup from "yup";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosClient } from "hooks";
import routes from "routes/routes";
import styles from "./VerifyEmail.module.scss";

const cx = classNames.bind(styles);

function VerifyEmail() {
    const axiosClient = useAxiosClient();

    const [loading, setLoading] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    const initialValues = { otp: "" };

    const validationSchema = Yup.object({
        otp: Yup.string().required("Vui lòng nhập trường này"),
    });

    const handleSubmitForm = async (values) => {
        const url = userApiURL.verifyOTP({
            email: state.email,
            code: values.otp,
        });
        const res = await axiosClient.get(url);
        if (res.error) return toast.error(res.error);

        toast.success(res.message);
        navigate(
            { pathname: routes.resetPassword },
            { state: { email: state.email }, replace: true }
        );
    };

    const handleClickResetPassword = async () => {
        try {
            setLoading(true);
            const generateOTPurl = userApiURL.generateOTP({
                email: state.email,
            });
            const { code } = await axiosClient.get(generateOTPurl);

            const url = userApiURL.getUser(state.email);
            const { data: userData } = await axiosClient.get(url);

            const data = {
                fullName: userData.fullName,
                email: userData.email,
                text: `Mã OTP của bạn là ${code}.`,
                subject: "Mã xác thực",
            };
            const registerMailURL = userApiURL.registerMail();
            const res = await axiosClient.post(registerMailURL, data);

            setLoading(false);
            if (res.error) return toast.error(res.error);
            toast.success(res.message);
        } catch (error) {
            toast.error("Xảy ra lỗi");
        }
    };

    if (!state) {
        toast.error("Vui lòng nhập email");
        return <Navigate to={routes.login} />;
    }

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>Xác thực tài khoản</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="text-center">
                                <FormText>
                                    Nhập 6 số OTP đã được gửi đến email của bạn.
                                </FormText>
                            </FormGroup>
                            <FastField
                                name="otp"
                                component={InputField}
                                placeholder="OTP"
                            />
                            <FormGroup>
                                <Button
                                    disabled={loading}
                                    loading={loading}
                                    type="submit"
                                    primary
                                    className={cx("submit-btn")}
                                >
                                    Khôi phục mật khẩu
                                </Button>
                            </FormGroup>
                            <FormGroup className="d-flex align-items-center justify-content-between">
                                <Link to={routes.login} className={cx("link")}>
                                    <HiOutlineArrowLongLeft size={20} />
                                    <span className="ms-1">Đăng nhập</span>
                                </Link>
                                <FormText
                                    style={{ fontSize: "16px" }}
                                    className="mb-0"
                                >
                                    Không nhận được mã OTP?{" "}
                                    <span
                                        className={cx("resend-btn")}
                                        onClick={handleClickResetPassword}
                                    >
                                        Gửi lại
                                    </span>
                                </FormText>
                            </FormGroup>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default VerifyEmail;
