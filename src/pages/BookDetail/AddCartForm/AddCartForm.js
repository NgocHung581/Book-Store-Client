import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { FastField, Form, Formik } from "formik";
import styles from "../BookDetail.module.scss";
import { addToCart } from "redux/slices/cartSlice";

const cx = classNames.bind(styles);

function AddCartForm({ book }) {
    const dispatch = useDispatch();

    const initialValues = {
        quantity: 1,
        name: book.name,
        id: book._id,
        price: book.price,
        image: book.image,
    };

    const handleSubmitCart = (values) => {
        if (values.quantity > book.in_stock)
            return toast.error(
                `Số lượng trong kho chỉ còn ${book.in_stock}. Không đủ để cung cấp cho bạn!`
            );
        const cartItem = addToCart({
            ...values,
            checked: false,
            slug: book?.slug,
        });
        dispatch(cartItem);
        toast.success("Bạn vừa thêm 1 sản phẩm vào giỏ hàng");
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
                            <Button
                                type="submit"
                                outline
                                className={cx("actions-btn")}
                            >
                                <AiOutlineHeart size={20} className="me-1" />
                                Yêu thích
                            </Button>
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
