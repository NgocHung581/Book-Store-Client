import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import Loader from "components/Loader";
import InputField from "custom-fields/InputField";
import { useAxiosAuth, useAxiosClient } from "hooks";
import styles from "./AddEditUser.module.scss";
import equalTo from "utils/validation/equalTo";
import routes from "routes";
import RadioField from "custom-fields/RadioField";

const cx = classNames.bind(styles);

function AddEditUser() {
    const axiosClient = useAxiosClient();
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

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

    const [initialValues, setInitialValues] = useState({
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [loading, setLoading] = useState(false);

    const { email } = useParams();
    const navigate = useNavigate();

    const handleSubmitForm = async (values, { resetForm }) => {
        if (email) {
            try {
                const url = userApiURL.updateByAdmin(email);
                const res = await axiosAuth.put(url, values, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                toast.success(res.message);
                resetForm();
                navigate(routes.manageUser);
            } catch (error) {
                toast.error(error.response.data.error);
            }
        } else {
            try {
                const url = userApiURL.register();
                const res = await axiosClient.post(url, values);
                toast.success(res.message);
                resetForm();
                navigate(routes.manageUser);
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        if (email) {
            const fetchUser = async () => {
                setLoading(true);
                const url = userApiURL.getUser(email);
                const res = await axiosClient.get(url);
                setInitialValues({
                    fullName: res.data.fullName,
                    email: res.data.email,
                    role: res.data.role,
                    phone: res.data.phone,
                    address: res.data.address,
                });
                setLoading(false);
            };

            fetchUser();
        }
    }, [email, axiosClient]);

    if (loading) return <Loader />;

    return (
        <div className={cx("wrapper")}>
            <div className={cx("back-btn")} onClick={() => navigate(-1)}>
                <MdKeyboardArrowLeft size={24} /> Trở lại
            </div>

            <h1 className={cx("title")}>
                {email ? "Cập nhật người dùng" : "Thêm người dùng"}
            </h1>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={!email && validationSchema}
            >
                {({ handleSubmit, values }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <FastField
                                        name="fullName"
                                        component={InputField}
                                        placeholder="Nhập họ tên người dùng"
                                        label="Họ tên"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        placeholder="Nhập email"
                                        label="Email"
                                        disabled={email && true}
                                    />
                                </Col>
                                {!email && (
                                    <>
                                        <Col lg={6}>
                                            <FastField
                                                name="password"
                                                component={InputField}
                                                placeholder="Nhập mật khẩu"
                                                label="Mật khẩu"
                                                type="password"
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <FastField
                                                name="passwordConfirm"
                                                component={InputField}
                                                placeholder="Nhập lại mật khẩu"
                                                label="Nhập lại mật khẩu"
                                                type="password"
                                            />
                                        </Col>
                                    </>
                                )}
                                {email && (
                                    <>
                                        <Col lg={3}>
                                            <FastField
                                                name="phone"
                                                component={InputField}
                                                placeholder="Nhập số điện thoại"
                                                label="Số điện thoại"
                                            />
                                        </Col>
                                        <Col lg={3}>
                                            <FastField
                                                name="address"
                                                component={InputField}
                                                placeholder="Nhập địa chỉ"
                                                label="Địa chỉ"
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Label>Role</Label>
                                            <div className="d-flex gap-3">
                                                <FastField
                                                    name="role"
                                                    passedValue="admin"
                                                    component={RadioField}
                                                    label="Admin"
                                                />
                                                <FastField
                                                    name="role"
                                                    passedValue="user"
                                                    component={RadioField}
                                                    label="User"
                                                />
                                            </div>
                                        </Col>
                                    </>
                                )}

                                <Col lg={12}>
                                    <Button
                                        disabled={values === initialValues}
                                        type="submit"
                                        primary
                                        className="mt-3"
                                    >
                                        {email ? "Cập nhật" : "Thêm"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default AddEditUser;
