import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosClient } from "hooks";
import routes from "routes/routes";
import equalTo from "utils/validation/equalTo";
import styles from "../Register.module.scss";

const cx = classNames.bind(styles);

function RegisterForm() {
    const axiosClient = useAxiosClient();

    Yup.addMethod(Yup.string, "equalTo", equalTo);

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Vui lòng nhập trường này"),
        email: Yup.string()
            .email("Trường này phải là email")
            .required("Vui lòng nhập trường này"),
        password: Yup.string()
            .min(6, "Vui lòng nhập tối thiểu 6 ký tự")
            .required("Vui lòng nhập trường này"),
        passwordConfirm: Yup.string()
            .equalTo(Yup.ref("password"))
            .required("Vui lòng nhập trường này"),
    });

    const initialValues = {
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    const navigate = useNavigate();

    const handleSubmitForm = async (values, { resetForm }) => {
        try {
            const url = userApiURL.register();
            const res = await axiosClient.post(url, values);
            if (res) {
                toast.success(res.message);
                navigate(routes.login);
            } else {
                toast.error(res.error);
            }
            resetForm();
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div className={cx("form-register")}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <FastField
                                name="fullName"
                                component={InputField}
                                placeholder="Họ và tên"
                            />
                            <FastField
                                name="email"
                                component={InputField}
                                placeholder="Email"
                                id="email-register"
                            />
                            <FastField
                                name="password"
                                component={InputField}
                                placeholder="Mật khẩu"
                                type="password"
                                id="password-register"
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
                                Đăng ký
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default RegisterForm;
