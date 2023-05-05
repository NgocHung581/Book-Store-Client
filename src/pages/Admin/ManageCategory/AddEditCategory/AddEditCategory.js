import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FastField, Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import styles from "./AddEditCategory.module.scss";
import InputField from "custom-fields/InputField";
import Button from "components/Button";
import categoryApiURL from "api/categoryApiURL";
import { useAxiosAuth, useAxiosClient } from "hooks";
import Loader from "components/Loader";
import routes from "routes";

const cx = classNames.bind(styles);

function AddEditCategory() {
    const axiosAuth = useAxiosAuth();
    const axiosClient = useAxiosClient();

    const { user } = useSelector((state) => state.user);

    const { slug } = useParams();
    const navigate = useNavigate();

    const categoryIdRef = useRef();

    const [initialValues, setInitialValues] = useState({
        name: "",
    });
    const [loading, setLoading] = useState(true);

    const handleSubmitForm = async (values, { resetForm }) => {
        if (slug) {
            try {
                const url = categoryApiURL.updateAndDelete(
                    categoryIdRef.current
                );
                const res = await axiosAuth.put(url, values, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                });
                toast.success(res.message);
                resetForm();
                navigate(routes.manageCategory);
            } catch (error) {
                toast.error(error.response.data.error);
            }
        } else {
            try {
                const url = categoryApiURL.create();
                const res = await axiosAuth.post(url, values, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                });

                toast.success(res.message);
                resetForm();
                navigate(routes.manageCategory);
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        if (slug) {
            const fetchBook = async () => {
                setLoading(true);
                const url = categoryApiURL.get(slug);
                const res = await axiosClient.get(url);
                setInitialValues({
                    name: res.data.name,
                    slug: res.data.slug,
                });
                categoryIdRef.current = res.data._id;
                setLoading(false);
            };

            fetchBook();
        }
    }, [slug, axiosClient]);

    if (loading && slug) return <Loader />;

    return (
        <div className={cx("wrapper")}>
            <div className={cx("back-btn")} onClick={() => navigate(-1)}>
                <MdKeyboardArrowLeft size={24} /> Trở lại
            </div>

            <h1 className={cx("title")}>
                {slug ? "Cập nhật danh mục" : "Thêm danh mục"}
            </h1>

            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                {({ handleSubmit, values }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <FastField
                                        name="name"
                                        component={InputField}
                                        placeholder="Nhập tên danh mục"
                                        label="Tên danh mục"
                                    />
                                </Col>

                                {slug && (
                                    <Col lg={6}>
                                        <FastField
                                            name="slug"
                                            component={InputField}
                                            label="Slug"
                                        />
                                    </Col>
                                )}

                                <Col lg={12}>
                                    <Button
                                        disabled={values === initialValues}
                                        type="submit"
                                        primary
                                        className="mt-3"
                                    >
                                        {slug ? "Cập nhật" : "Thêm"}
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

export default AddEditCategory;
