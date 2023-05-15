import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, FormGroup, Row } from "reactstrap";

import userApiURL from "api/userApiURL";
import images from "assets/images";
import Button from "components/Button";
import FileField from "custom-fields/FileField";
import InputField from "custom-fields/InputField";
import { useAxiosAuth } from "hooks";
import { loginPending, updateUser } from "redux/slices/userSlice";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
    const axiosAuth = useAxiosAuth();

    const [imageFile, setImageFile] = useState("");
    const { user, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const initialValues = {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
    };

    const handleSubmitForm = async (values) => {
        dispatch(loginPending());
        const url = userApiURL.update();
        const res = await axiosAuth.put(url, values, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });

        dispatch(updateUser(res.data));
        toast.success(res.message);
    };

    return (
        <div className={cx("wrapper")}>
            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                {({ handleSubmit, setFieldValue }) => {
                    return (
                        <Form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <Row>
                                <Col lg={4} md={12} xs={12}>
                                    <div className={cx("left")}>
                                        <div className={cx("avatar")}>
                                            <img
                                                src={
                                                    imageFile ||
                                                    (user?.avatar &&
                                                        `${process.env.REACT_APP_SERVER_IMAGE_URL}/${user.avatar}`) ||
                                                    images.user
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <FastField
                                            name="avatar"
                                            component={FileField}
                                            label="Đổi ảnh đại diện"
                                            type="file"
                                            inputClassName="d-none"
                                            setImageFile={setImageFile}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                </Col>
                                <Col lg={8} md={12} xs={12}>
                                    <div className={cx("right")}>
                                        <h2 className={cx("title")}>
                                            Thông tin cá nhân
                                        </h2>

                                        <FastField
                                            name="email"
                                            component={InputField}
                                            placeholder="Email"
                                            disabled
                                        />

                                        <Row>
                                            <Col lg={6}>
                                                <FastField
                                                    name="fullName"
                                                    component={InputField}
                                                    placeholder="Họ và tên"
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <FastField
                                                    name="phone"
                                                    component={InputField}
                                                    placeholder="Số điện thoại"
                                                />
                                            </Col>
                                        </Row>

                                        <FastField
                                            name="address"
                                            component={InputField}
                                            placeholder="Địa chỉ"
                                        />

                                        <FormGroup className="d-flex align-items-center justify-content-between">
                                            <p className={cx("point")}>
                                                Sô điểm đã tích lũy:{" "}
                                                {user?.point} diểm
                                            </p>
                                            <Button
                                                disabled={loading}
                                                loading={loading}
                                                type="submit"
                                                primary
                                                className={cx("submit-btn")}
                                            >
                                                Cập nhật
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Profile;
