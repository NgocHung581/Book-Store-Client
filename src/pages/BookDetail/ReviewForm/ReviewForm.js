import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import reviewApiURL from "api/reviewApiURL";
import images from "assets/images";
import Button from "components/Button";
import { RATING_OPTIONS } from "constants";
import InputField from "custom-fields/InputField";
import RatingField from "custom-fields/RatingField";
import { useAxiosAuth } from "hooks";
import {
    createReviewRequest,
    createReviewSuccess,
} from "redux/slices/reviewSlice";
import routes from "routes";
import styles from "./ReviewForm.module.scss";

const cx = classNames.bind(styles);

function ReviewForm({ bookId }) {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        content: Yup.string().required("Vui lòng nhập trường này"),
        rating: Yup.number().min(1, "Vui lòng đánh giá sản phẩm"),
    });

    const initialValues = { rating: 0, content: "" };

    const handleSubmitReview = async (values, { resetForm }) => {
        dispatch(createReviewRequest());
        const data = { ...values, bookId };
        const url = reviewApiURL.create();
        const res = await axiosAuth.post(url, data, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        toast.success(res.message);
        dispatch(createReviewSuccess());
        resetForm();
    };

    return (
        <div className={cx("wrapper")}>
            <h5 className={cx("title")}>Viết đánh giá của bạn</h5>
            {user ? (
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
                                        name="rating"
                                        component={RatingField}
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
            ) : (
                <div>
                    Vui lòng
                    <Link to={routes.login} className={cx("auth-link")}>
                        đăng nhập
                    </Link>
                    hoặc
                    <Link to={routes.register} className={cx("auth-link")}>
                        đăng ký
                    </Link>
                    để đánh giá sản phẩm.
                </div>
            )}
        </div>
    );
}

ReviewForm.propTypes = {
    bookId: PropTypes.string.isRequired,
};

export default ReviewForm;
