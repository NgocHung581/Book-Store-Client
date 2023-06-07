import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

import styles from "./CategoryItem.module.scss";
import routes from "routes";
import Button from "components/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import categoryApiURL from "api/categoryApiURL";
import { useAxiosAuth } from "hooks";
import {
    deleteCategoryRequest,
    deleteCategorySuccess,
} from "redux/slices/categorySlice";

const cx = classNames.bind(styles);

function CategoryItem({ category, index }) {
    const axiosAuth = useAxiosAuth();
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);

    const { user } = useSelector((state) => state.user);

    const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

    const handleDelete = async () => {
        try {
            dispatch(deleteCategoryRequest());
            const url = categoryApiURL.updateAndDelete(category?._id);
            const res = await axiosAuth.delete(url, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            });
            toast.success(res.message);
            dispatch(deleteCategorySuccess());
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setDeleteModal(false);
        }
    };

    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{category?._id}</td>

                <td>
                    <span className={cx("name")}>{category?.name}</span>
                </td>

                <td>
                    <span className={cx("slug")}>{category?.slug}</span>
                </td>
                <td>
                    <Link
                        to={`${routes.manageCategory}/update/${category?.slug}`}
                    >
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
                    Xác nhận xóa danh mục
                </ModalHeader>
                <ModalBody>
                    Bạn có chắc chắn muốn xóa danh mục này không?
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

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
};

export default CategoryItem;
