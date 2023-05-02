import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Col, Label, Row } from "reactstrap";
import { toast } from "react-toastify";

import categoryApiURL from "api/categoryApiURL";
import Button from "components/Button";
import FileField from "custom-fields/FileField";
import InputField from "custom-fields/InputField";
import RadioField from "custom-fields/RadioField";
import SelectField from "custom-fields/SelectField";
import { useAxiosClient } from "hooks";
import styles from "./AddProduct.module.scss";
import bookApiURL from "api/bookApiURL";
import routes from "routes";

const cx = classNames.bind(styles);

function AddProduct() {
    const axiosClient = useAxiosClient();

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        description: "",
        image: "",
        author: "",
        price: 0,
        in_stock: 0,
        category: "",
        slider: false,
    };

    const [categories, setCategories] = useState();
    const [imageFile, setImageFile] = useState("");

    const handleSubmitForm = async (values, { resetForm }) => {
        const category = {
            id: values.category.split("_")[0],
            slug: values.category.split("_")[1],
        };

        const url = bookApiURL.create();
        const res = await axiosClient.post(
            url,
            { ...values, category },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        toast.success(res.message);
        resetForm();
        setImageFile("");
        navigate(routes.manageProduct);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const url = categoryApiURL.getAll();
            const res = await axiosClient.get(url);

            const categoriesOptions = res?.data?.map((category) => ({
                value: `${category._id}_${category.slug}`,
                label: category.name,
            }));
            setCategories(categoriesOptions);
        };

        fetchCategories();
    }, [axiosClient]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("back-btn")} onClick={() => navigate(-1)}>
                <MdKeyboardArrowLeft size={24} /> Trở lại
            </div>

            <h1 className={cx("title")}>Thêm sản phẩm</h1>

            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                {({ handleSubmit, setFieldValue }) => {
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
                                <Col lg={6}>
                                    <FastField
                                        name="description"
                                        component={InputField}
                                        type="textarea"
                                        placeholder="Mô tả sản phẩm"
                                        label="Mô tả"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <div className="d-flex align-items-center gap-5">
                                        <Label>Hỉnh ảnh:</Label>
                                        <div className="position-relative">
                                            {imageFile && (
                                                <div className={cx("img")}>
                                                    <img
                                                        src={imageFile}
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
                                            value={true}
                                            component={RadioField}
                                            label="Có"
                                        />
                                        <FastField
                                            name="slider"
                                            value={false}
                                            component={RadioField}
                                            label="Không"
                                        />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <Button
                                        type="submit"
                                        primary
                                        className="mt-3"
                                    >
                                        Thêm
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

export default AddProduct;
