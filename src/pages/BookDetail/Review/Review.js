import classNames from "classnames/bind";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import { Col, Progress, Row } from "reactstrap";

import ReviewForm from "../ReviewForm";
import ReviewGroup from "../ReviewGroup";
import styles from "./Review.module.scss";

const cx = classNames.bind(styles);

function ProgressGroup({ label, value }) {
    return (
        <div className="d-flex align-items-center">
            <span>{label}</span>
            <Progress
                className={cx("progress")}
                barClassName={cx("progress-bar")}
                value={value}
            />
            <span>{value}%</span>
        </div>
    );
}

function Review({ bookId }) {
    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>Đánh giá sản phẩm</h2>
            <Row>
                <Col lg={6}>
                    <Row>
                        <Col lg={4}>
                            <div className="d-flex flex-column align-items-center">
                                <div className={cx("total-rating")}>
                                    <span style={{ fontSize: "52px" }}>5</span>
                                    <span style={{ fontSize: "26px" }}>/5</span>
                                </div>
                                <StarRatings
                                    rating={5}
                                    starRatedColor="#fed900"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                                <span
                                    className="text-muted mt-1"
                                    style={{ fontSize: "14px" }}
                                >
                                    (2 đánh giá)
                                </span>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <ProgressGroup label="5 sao" value={50} />
                            <ProgressGroup label="4 sao" value={30} />
                            <ProgressGroup label="3 sao" value={20} />
                            <ProgressGroup label="2 sao" value={0} />
                            <ProgressGroup label="1 sao" value={0} />
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <ReviewForm bookId={bookId} />
                </Col>
            </Row>

            <ReviewGroup bookId={bookId} />
        </div>
    );
}

ProgressGroup.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

Review.propTypes = {
    bookId: PropTypes.string.isRequired,
};

export default Review;
