import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormGroup } from "reactstrap";

import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { FastField, Form, Formik } from "formik";
import { addToCart } from "redux/slices/cartSlice";
import { useAxiosAuth } from "hooks";
import styles from "../BookDetail.module.scss";
import { updateUser } from "redux/slices/userSlice";
import userApiURL from "api/userApiURL";
import cartApiURL from "api/cartApiURL";

const cx = classNames.bind(styles);

function AddCartForm({ book }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const existingBookFavorite = user?.favorite?.find(
        (item) => item === book?._id
    );

    const initialValues = {
        quantity: 1,
        bookId: book?._id,
    };

    const handleSubmitCart = async (values) => {
        if (values.quantity > book.in_stock)
            return toast.error(
                `Số lượng trong kho chỉ còn ${book.in_stock}. Không đủ để cung cấp cho bạn!`
            );
        const url = cartApiURL.getAllOrAddOrUpdate();
        const res = await axiosAuth.post(url, values, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
        toast.success(res.message);
        dispatch(addToCart(res.data));
    };

    const handleDeleteFavorite = async () => {
        const url = userApiURL.deleteFavorite(book?._id);
        const res = await axiosAuth.delete(url, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        dispatch(updateUser({ favorite: res.data }));
        toast.success(res.message);
    };

    const handleAddFavorite = async () => {
        const url = userApiURL.getOrAddFavorite();
        const res = await axiosAuth.post(
            url,
            { bookId: book?._id },
            {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            }
        );
        dispatch(updateUser({ favorite: res.data }));
        toast.success(res.message);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmitCart}>
            {({ handleSubmit }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <FastField
                            name="quantity"
                            component={InputField}
                            label="Số lượng:"
                            type="number"
                            groupClassName="w-50 mt-3"
                            min={1}
                        />
                        <FormGroup className="d-flex align-items-center mt-4">
                            <Button
                                type="submit"
                                disabled={book?.in_stock <= 0}
                                primary
                                className={cx("actions-btn")}
                            >
                                <BsCartPlus size={20} className="me-1" />
                                Thêm vào giỏ
                            </Button>
                            {existingBookFavorite ? (
                                <Button
                                    type="button"
                                    outline
                                    className={cx("actions-btn")}
                                    onClick={handleDeleteFavorite}
                                >
                                    <AiFillHeart size={20} className="me-1" />
                                    Đã yêu thích
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    outline
                                    className={cx("actions-btn")}
                                    onClick={handleAddFavorite}
                                >
                                    <AiOutlineHeart
                                        size={20}
                                        className="me-1"
                                    />
                                    Yêu thích
                                </Button>
                            )}
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

AddCartForm.propTypes = {
    book: PropTypes.object.isRequired,
};

export default AddCartForm;
