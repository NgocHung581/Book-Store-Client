import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import { useAxiosAuth } from "hooks";
import routes from "routes";
import styles from "./UserItem.module.scss";
import { deleteUserRequest, deleteUserSuccess } from "redux/slices/userSlice";

const cx = classNames.bind(styles);

function UserItem({ user, index }) {
    const axiosAuth = useAxiosAuth();
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);

    const {
        user: { accessToken },
    } = useSelector((state) => state.user);

    const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

    const handleDelete = async () => {
        try {
            dispatch(deleteUserRequest());
            const url = userApiURL.delete(user?._id);
            const res = await axiosAuth.delete(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success(res.message);
            dispatch(deleteUserSuccess());
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
                <td>{user?._id}</td>
                <td>
                    <span className={cx("name")}>{user?.fullName}</span>
                </td>
                <td>
                    <span className={cx("email")}>{user?.email}</span>
                </td>
                <td>
                    <span className={cx("phone")}>{user?.phone}</span>
                </td>
                <td>
                    <span className={cx("address")}>{user?.address}</span>
                </td>
                <td>
                    <span
                        className={cx("role")}
                        style={{
                            "--text-color":
                                user?.role === "admin" ? "#e94560" : "#000",
                        }}
                    >
                        {user?.role}
                    </span>
                </td>
                <td>
                    <Link to={`${routes.manageUser}/update/${user?.email}`}>
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
            >
                <ModalHeader toggle={toggleDeleteModal}>
                    Xác nhận xóa người dùng
                </ModalHeader>
                <ModalBody>
                    Bạn có chắc chắn muốn xóa người dùng này không?
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

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserItem;
