import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    Navigate,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import * as Yup from "yup";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosClient } from "hooks";
import {
    loginFailure,
    loginPending,
    loginSuccess,
} from "redux/slices/userSlice";
import routes from "routes";
import styles from "../Login.module.scss";

const cx = classNames.bind(styles);

function Password() {
    const axiosClient = useAxiosClient();
    const [loadingSendEmail, setLoadingSendEmail] = useState(false);
    const [user] = useOutletContext();
    const { state } = useLocation();
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        password: "",
    };

    const validationSchema = Yup.object({
        password: Yup.string().required("Vui lòng nhập trường này"),
    });

    const handleSubmitForm = async (values) => {
        dispatch(loginPending());
        const data = { email: state.email, password: values.password };

        const url = userApiURL.login();
        const res = await axiosClient.post(url, data);

        if (res.error) {
            dispatch(loginFailure(res.error));
            toast.error(res.error);
            return;
        }

        dispatch(loginSuccess(res.data));
        toast.success(res.message);
        navigate(routes.home);
    };

    const handleClickResetPassword = async () => {
        try {
            setLoadingSendEmail(true);
            const generateOTPurl = userApiURL.generateOTP({
                email: state.email,
            });
            const { code } = await axiosClient.get(generateOTPurl);

            const data = {
                fullName: user?.fullName,
                email: user?.email,
                text: `Mã OTP của bạn là ${code}.`,
                subject: "Mã xác thực",
            };
            const registerMailURL = userApiURL.registerMail();
            const res = await axiosClient.post(registerMailURL, data);

            setLoadingSendEmail(false);
            toast.success(res.message);
            navigate(
                { pathname: routes.verifyEmail },
                { state: { email: state.email }, replace: true }
            );
        } catch (error) {
            toast.error("Xảy ra lỗi");
        }
    };

    if (!state) {
        toast.error("Vui lòng nhập email");
        return <Navigate to={routes.login} />;
    }

    return (
        <div className={cx("form-password")}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row className={cx("form")}>
                                <Col lg={12} className={cx("password-wrapper")}>
                                    <FastField
                                        name="password"
                                        component={InputField}
                                        type="password"
                                        placeholder="Mật khẩu"
                                    />
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div className={cx("link-back")}>
                                            <Link to={routes.login}>
                                                <HiOutlineArrowLongLeft
                                                    size={20}
                                                />
                                                <span className="ms-1">
                                                    Đăng nhập
                                                </span>
                                            </Link>
                                        </div>
                                        <div className={cx("link-options")}>
                                            <Button
                                                type="button"
                                                text
                                                className="border-0 p-0"
                                                onClick={
                                                    handleClickResetPassword
                                                }
                                            >
                                                Quên mật khẩu?
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Button
                                disabled={loading || loadingSendEmail}
                                loading={loading || loadingSendEmail}
                                type="submit"
                                primary
                                className={cx("submit-btn")}
                            >
                                {loadingSendEmail
                                    ? "Đang gửi mã OTP"
                                    : "Đăng nhập"}
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Password;
