import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import * as Yup from "yup";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosClient } from "hooks";
import routes from "routes/routes";
import styles from "../Login.module.scss";

const cx = classNames.bind(styles);

function Email() {
    const axiosClient = useAxiosClient();
    const [, setUser] = useOutletContext();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Trường này phải là email")
            .required("Vui lòng nhập trường này"),
    });

    const handleSubmitForm = async (values) => {
        setLoading(true);

        const url = userApiURL.getUser(values.email);
        const res = await axiosClient.get(url);

        setUser(res.data);
        setLoading(false);
        if (res.error) return toast.error(res.error);
        navigate(
            { pathname: `${routes.login}/password` },
            { state: values, replace: true }
        );
    };

    return (
        <div className={cx("form-email")}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row className={cx("form")}>
                                <Col lg={12} className={cx("email-wrapper")}>
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        placeholder="Email"
                                    />
                                </Col>
                            </Row>
                            <div className={cx("link-back", "mb-4")}>
                                <Link to={routes.home}>
                                    <HiOutlineArrowLongLeft size={20} />
                                    <span className="ms-1">
                                        Trở lại trang chủ
                                    </span>
                                </Link>
                            </div>
                            <Button
                                disabled={loading}
                                loading={loading}
                                type="submit"
                                primary
                                className={cx("submit-btn")}
                            >
                                Tiếp tục
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Email;
