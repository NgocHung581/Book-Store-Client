import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import reviewApiURL from "api/reviewApiURL";
import images from "assets/images";
import Button from "components/Button";
import { RATING_OPTIONS } from "constants";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import { useAxiosAuth } from "hooks";
import styles from "./ReviewForm.module.scss";

const cx = classNames.bind(styles);

function ReviewForm({ bookId }) {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);

    const validationSchema = Yup.object({
        content: Yup.string().required("Vui lòng nhập trường này"),
        star: Yup.number().required("Vui lòng nhập trường này").nullable(),
    });

    const initialValues = { star: null, content: "" };

    const handleSubmitReview = async (values, { resetForm }) => {
        const data = { ...values, bookId };
        const url = reviewApiURL.create();
        const res = await axiosAuth.post(url, data, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        toast.success(res.message);
        resetForm();
    };

    return (
        <div className={cx("wrapper")}>
            <h5 className={cx("title")}>Viết đánh giá của bạn</h5>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitReview}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <div className={cx("avatar")}>
                                <img
                                    src={
                                        user?.avatar
                                            ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${user?.avatar}`
                                            : images.user
                                    }
                                    alt={user?.fullName}
                                />
                            </div>
                            <div className={cx("content")}>
                                <FastField
                                    name="star"
                                    component={SelectField}
                                    options={RATING_OPTIONS}
                                    className="w-100"
                                    placeholder="-- Đánh giá --"
                                />
                                <FastField
                                    name="content"
                                    component={InputField}
                                    type="textarea"
                                    label="Đánh giá"
                                    placeholder="Hãy chia sẻ cảm nhận của bạn về sách này nhé"
                                />
                                <div className={cx("actions")}>
                                    <Button
                                        type="submit"
                                        outline
                                        className={cx("submit-btn")}
                                    >
                                        Bình luận
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

ReviewForm.propTypes = {
    bookId: PropTypes.string.isRequired,
};

export default ReviewForm;
