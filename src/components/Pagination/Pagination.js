import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import styles from "./Pagination.module.scss";

const cx = classNames.bind(styles);

function Pagination({ pageCount = 0, forcePage = 0, onPageChange = () => [] }) {
    return (
        <ReactPaginate
            className={cx("wrapper")}
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={onPageChange}
            forcePage={forcePage}
            breakLabel="..."
            nextLabel={<MdKeyboardArrowRight size={28} />}
            previousLabel={<MdKeyboardArrowLeft size={28} />}
            renderOnZeroPageCount={null}
            previousClassName={cx("previous-btn")}
            nextClassName={cx("next-btn")}
            breakLinkClassName={cx("link")}
            pageLinkClassName={cx("link")}
            previousLinkClassName={cx("link")}
            nextLinkClassName={cx("link")}
            activeLinkClassName={cx("active")}
            disabledLinkClassName={cx("disabled")} //Disable previous and next button
        />
    );
}

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    forcePage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
