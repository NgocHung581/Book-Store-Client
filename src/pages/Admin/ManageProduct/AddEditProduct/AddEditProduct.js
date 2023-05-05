import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Label, Row } from "reactstrap";
import { useSelector } from "react-redux";

import bookApiURL from "api/bookApiURL";
import categoryApiURL from "api/categoryApiURL";
import Button from "components/Button";
import FileField from "custom-fields/FileField";
import InputField from "custom-fields/InputField";
import RadioField from "custom-fields/RadioField";
import SelectField from "custom-fields/SelectField";
import { useAxiosAuth, useAxiosClient } from "hooks";
import routes from "routes";
import styles from "./AddEditProduct.module.scss";
import Loader from "components/Loader";

const cx = classNames.bind(styles);

function AddEditProduct() {
    const axiosClient = useAxiosClient();
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const { slug } = useParams();

    const bookIdRef = useRef();

    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        image: "",
        author: "",
        price: 0,
        in_stock: 0,
        category: "",
        slider: "false",
    });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState();
    const [imageFile, setImageFile] = useState("");

    const handleSubmitForm = async (values, { resetForm }) => {
        const category = {
            id: values.category.split("_")[0],
            slug: values.category.split("_")[1],
        };
        if (slug) {
            try {
                const url = bookApiURL.update(bookIdRef.current);
                const res = await axiosAuth.put(
                    url,
                    { ...values, category },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${user?.accessToken}`,
                        },
                    }
                );
                toast.success(res.message);
                resetForm();
                setImageFile("");
                navigate(routes.manageProduct);
            } catch (error) {
                toast.error(error.response.data.error);
            }
        } else {
            try {
                const url = bookApiURL.create();
                const res = await axiosAuth.post(
                    url,
                    { ...values, category },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${user?.accessToken}`,
                        },
                    }
                );

                toast.success(res.message);
                resetForm();
                setImageFile("");
                navigate(routes.manageProduct);
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const url = categoryApiURL.getAll();
            const res = await axiosClient.get(url);

            const categoriesOptions = res?.data?.results?.map((category) => ({
                value: `${category._id}_${category.slug}`,
                label: category.name,
            }));
            setCategories(categoriesOptions);
        };

        fetchCategories();
    }, [axiosClient]);

    useEffect(() => {
        if (slug) {
            const fetchBook = async () => {
                setLoading(true);
                const url = bookApiURL.get(slug);
                const res = await axiosClient.get(url);
                setInitialValues({
                    name: res.data.name,
                    description: res.data.description,
                    image: res.data.image,
                    author: res.data.author,
                    price: res.data.price,
                    in_stock: res.data.in_stock,
                    category: `${res.data.category.id}_${res.data.category.slug}`,
                    slider: `${res.data.slider}`,
                });
                bookIdRef.current = res.data._id;
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
                {slug ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </h1>

            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                {({ handleSubmit, setFieldValue, values }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={6}>
                                    <FastField
                                        name="name"
                                        component={InputField}
                                        placeholder="Nhập tên sách"
                                        label="Tên sách"
                                    />
                                </Col>
                                <Col lg={6}>
                                    {categories && (
                                        <FastField
                                            name="category"
                                            component={SelectField}
                                            placeholder="Danh mục"
                                            label="Danh mục"
                                            options={categories}
                                        />
                                    )}
                                </Col>
                                <Col lg={3}>
                                    <FastField
                                        name="price"
                                        component={InputField}
                                        type="number"
                                        label="Đơn giá"
                                    />
                                </Col>
                                <Col lg={3}>
                                    <FastField
                                        name="in_stock"
                                        component={InputField}
                                        type="number"
                                        label="Số lượng kho"
                                    />
                                </Col>
                                <Col lg={3}>
                                    <FastField
                                        name="author"
                                        component={InputField}
                                        placeholder="Nhập tên tác giả"
                                        label="Tác giả"
                                    />
                                </Col>
                                <Col lg={3}>
                                    <Label>Slider</Label>
                                    <div className="d-flex gap-3">
                                        <FastField
                                            name="slider"
                                            passedValue="true"
                                            component={RadioField}
                                            label="Có"
                                        />
                                        <FastField
                                            name="slider"
                                            passedValue="false"
                                            component={RadioField}
                                            label="Không"
                                        />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="d-flex align-items-center gap-5">
                                        <Label>Hỉnh ảnh:</Label>
                                        <div className="position-relative">
                                            {(imageFile ||
                                                initialValues.image) && (
                                                <div className={cx("img")}>
                                                    <img
                                                        src={
                                                            imageFile
                                                                ? imageFile
                                                                : `${process.env.REACT_APP_SERVER_IMAGE_URL}/${initialValues.image}`
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                            <FastField
                                                name="image"
                                                component={FileField}
                                                label="Chọn ảnh"
                                                type="file"
                                                inputClassName="d-none"
                                                labelClassName={cx(
                                                    "image-preview"
                                                )}
                                                setImageFile={setImageFile}
                                                setFieldValue={setFieldValue}
                                            />
                                        </div>
                                        {imageFile && (
                                            <BsTrash
                                                size={24}
                                                className={cx(
                                                    "delete-img-icon"
                                                )}
                                                onClick={() => setImageFile("")}
                                            />
                                        )}
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <FastField
                                        name="description"
                                        component={InputField}
                                        type="textarea"
                                        rows="11"
                                        placeholder="Mô tả sản phẩm"
                                        label="Mô tả"
                                    />
                                </Col>
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

export default AddEditProduct;
