import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import Button from "components/Button";
import { useAxiosAuth } from "hooks";
import styles from "./ProductItem.module.scss";
import {
    deleteProductRequest,
    deleteProductSuccess,
} from "redux/slices/productSlice";
import { Link } from "react-router-dom";
import routes from "routes";

const cx = classNames.bind(styles);

function ProductItem({ book, index }) {
    const axiosAuth = useAxiosAuth();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const [deleteModal, setDeleteModal] = useState(false);

    const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

    const handleDelete = async () => {
        try {
            dispatch(deleteProductRequest());
            const url = bookApiURL.delete(book?._id);
            const res = await axiosAuth.delete(url, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            });
            toast.success(res.message);
            setDeleteModal(false);
            dispatch(deleteProductSuccess());
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{book?._id}</td>
                <td>
                    <div className={cx("img")}>
                        <img
                            src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${book?.image}`}
                            alt={book?.name}
                        />
                    </div>
                </td>
                <td>
                    <span className={cx("name")}>{book?.name}</span>
                </td>
                <td>
                    <span className={cx("category")}>
                        {book?.category?.id?.name}
                    </span>
                </td>
                <td>
                    <span className={cx("price")}>
                        <NumericFormat
                            value={book?.price}
                            thousandSeparator=","
                            displayType="text"
                            renderText={(value) => `${value} đ`}
                        />
                    </span>
                </td>
                <td>
                    <span className={cx("in_stock")}>{book?.in_stock}</span>
                </td>
                <td>
                    <span className={cx("count_sell")}>{book?.count_sell}</span>
                </td>
                <td>
                    <Link to={`${routes.manageProduct}/update/${book?.slug}`}>
                        <MdOutlineModeEditOutline
                            size={20}
                            className={cx("edit-icon")}
                        />
                    </Link>
                    <BsTrash
                        size={20}
                        className={cx("delete-icon")}
                        onClick={toggleDeleteModal}
                    />
                </td>
            </tr>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModal}
                toggle={toggleDeleteModal}
                centered
                backdrop="static"
                style={{ color: "black" }}
            >
                <ModalHeader toggle={toggleDeleteModal}>
                    Xác nhận xóa sản phẩm
                </ModalHeader>
                <ModalBody>
                    Bạn có chắc chắn muốn xóa sản phẩm này không?
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={toggleDeleteModal}>
                        Hủy
                    </Button>
                    <Button primary onClick={handleDelete}>
                        Xác nhận
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

ProductItem.propTypes = {
    book: PropTypes.object.isRequired,
    index: PropTypes.number,
};

export default ProductItem;
