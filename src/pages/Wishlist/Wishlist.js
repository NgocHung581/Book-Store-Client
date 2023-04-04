import classNames from "classnames/bind";
import BookCard from "components/BookCard";
import { Col, Row } from "reactstrap";

import styles from "./Wishlist.module.scss";

const cx = classNames.bind(styles);

function Wishlist() {
    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>Bạn đã yêu thích</h2>
            <Row className="gy-4" lg={5}>
                {/* <Col lg={2.4}>
                    <BookCard />
                </Col> */}
            </Row>
        </div>
    );
}

export default Wishlist;
