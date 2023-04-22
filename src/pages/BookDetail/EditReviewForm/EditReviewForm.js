import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import { FormGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./EditReviewForm.module.scss";
import InputField from "custom-fields/InputField";
import RatingField from "custom-fields/RatingField";
import Button from "components/Button";
import reviewApiURL from "api/reviewApiURL";
import { useAxiosAuth } from "hooks";
import {
    createReviewRequest,
    createReviewSuccess,
} from "redux/slices/reviewSlice";

const cx = classNames.bind(styles);

function EditReviewForm({ reviewId, content, rating, setEditSession }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const initialValues = {
        content,
        rating,
    };

    const dispatch = useDispatch();

    const handleSubmitForm = async (values) => {
        dispatch(createReviewRequest());
        const url = reviewApiURL.edit(reviewId);
        const res = await axiosAuth.put(url, values, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        toast.success(res.message);
        dispatch(createReviewSuccess());
        setEditSession(false);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
            {({ handleSubmit }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <FastField name="rating" component={RatingField} />
                        <FastField
                            name="content"
                            component={InputField}
                            type="textarea"
                        />
                        <FormGroup className="text-end">
                            <Button
                                type="button"
                                outline
                                onClick={() => setEditSession(false)}
                                className={cx("action-btn")}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                primary
                                className={cx("action-btn")}
                            >
                                Lưu thay đổi
                            </Button>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

EditReviewForm.propTypes = {
    reviewId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    setEditSession: PropTypes.func.isRequired,
};

export default EditReviewForm;
