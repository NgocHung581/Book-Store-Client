import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import orderApiURL from "api/orderApiURL";
import Button from "components/Button";
import Separator from "components/Separator";
import InputField from "custom-fields/InputField";
import RadioField from "custom-fields/RadioField";
import { useAxiosAuth } from "hooks";
import { updateCartOnCheckout } from "redux/slices/cartSlice";
import routes from "routes";
import calculateDiscountOnPoint from "utils/calculateDiscountOnPoint";
import styles from "../Checkout.module.scss";

const cx = classNames.bind(styles);

function CheckoutForm() {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const { state } = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        fullName: user?.fullName,
        address: user?.address,
        email: user?.email,
        phone: user?.phone,
        paymentMethod: "",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Vui lòng nhập trường này"),
        address: Yup.string().required("Vui lòng nhập trường này"),
        email: Yup.string().required("Vui lòng nhập trường này"),
        phone: Yup.string().required("Vui lòng nhập trường này"),
        paymentMethod: Yup.string().required("Vui lòng nhập trường này"),
    });

    const handleSubmitForm = async ({
        fullName,
        address,
        email,
        phone,
        paymentMethod,
    }) => {
        if (state?.totalPrice <= 0) {
            navigate(routes.cart);
            toast.error("Vui lòng chọn sản phẩm cần thanh toán");
            return;
        }

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        let orderItems = [];
        state?.carts.forEach(
            (item) =>
                item?.isChecked &&
                orderItems.push({
                    book: item?.book?._id,
                    quantity: item?.quantity,
                })
        );

        const data = {
            orderItems,
            shippingInformation: {
                fullName,
                address,
                email,
                phone,
            },
            paymentMethod,
            itemsPrice: state?.subTotal,
            discount: state?.isUsePoint
                ? calculateDiscountOnPoint(user?.point)
                : 0,
            totalPrice: state?.totalPrice,
            userId: user?._id,
            date: currentDate,
        };

        const url = orderApiURL.create();
        const res = await axiosAuth.post(url, data, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`,
            },
        });

        navigate({ pathname: routes.order }, { replace: true });
        toast.success(res.message);
        dispatch(updateCartOnCheckout());
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <div className={cx("info-group")}>
                            <h4 className={cx("info-group-title")}>
                                Thông tin vận chuyển
                            </h4>
                            <FastField
                                name="fullName"
                                component={InputField}
                                label="Họ và tên"
                            />
                            <FastField
                                name="address"
                                component={InputField}
                                label="Địa chỉ"
                            />
                        </div>
                        <Separator />
                        <div className={cx("info-group")}>
                            <h4 className={cx("info-group-title")}>
                                Thông tin liên lạc
                            </h4>
                            <FastField
                                name="email"
                                component={InputField}
                                label="Email"
                            />
                            <FastField
                                name="phone"
                                component={InputField}
                                label="Số điện thoại"
                            />
                        </div>
                        <Separator />
                        <div className={cx("info-group")}>
                            <h4 className={cx("info-group-title")}>
                                Phương thức thanh toán
                            </h4>

                            <FastField
                                name="paymentMethod"
                                passedValue="Paypal"
                                component={RadioField}
                                label="Thanh toán thẻ"
                                disabled
                            />
                            <FastField
                                name="paymentMethod"
                                passedValue="COD"
                                component={RadioField}
                                label="COD (Thanh toán khi nhận hàng)"
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button to={routes.cart} outline>
                                Trở lại giỏ hàng
                            </Button>
                            <Button
                                type="submit"
                                primary
                                className={cx("submit-btn")}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default CheckoutForm;
