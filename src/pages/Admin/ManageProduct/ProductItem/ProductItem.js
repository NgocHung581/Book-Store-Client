import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import styles from "./ProductItem.module.scss";
import Button from "components/Button";
import { useState } from "react";

const cx = classNames.bind(styles);

function ProductItem({ book, index }) {
    const [editModal, setEditModal] = useState(false);

    const toggle = () => setEditModal((prev) => !prev);

    return (
        <>
            <tr key={book?._id}>
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
                    <MdOutlineModeEditOutline
                        size={20}
                        className={cx("edit-icon")}
                        onClick={toggle}
                    />
                    <BsTrash size={20} className={cx("delete-icon")} />
                </td>
            </tr>

            {/* Edit Modal */}
            <Modal
                isOpen={editModal}
                toggle={toggle}
                size="lg"
                centered
                backdrop="static"
            >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={toggle}>
                        Cancel
                    </Button>
                    <Button primary onClick={toggle}>
                        Do Something
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
