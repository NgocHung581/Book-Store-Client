import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { createContext, memo } from "react";
import StarRatings from "react-star-ratings";
import { Col, Progress, Row } from "reactstrap";

import styles from "./ReviewStatistic.module.scss";

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
export const ReviewContext = createContext();

function ReviewStatistic({ reviews, totalRating, totalReviews }) {
    return (
        <Row>
            <Col lg={4} md={4} xs={12}>
                <div className="d-flex flex-column align-items-center">
                    <div className={cx("total-rating")}>
                        <span style={{ fontSize: "52px" }}>{totalRating}</span>
                        <span style={{ fontSize: "26px" }}>/5</span>
                    </div>
                    <StarRatings
                        rating={totalRating}
                        starRatedColor="#fed900"
                        starDimension="20px"
                        starSpacing="2px"
                    />
                    <span
                        className="text-muted mt-1"
                        style={{ fontSize: "14px" }}
                    >
                        ({totalReviews} đánh giá)
                    </span>
                </div>
            </Col>
            <Col lg={8} md={8} xs={12}>
                {reviews?.map((review, index) => (
                    <ProgressGroup
                        key={index}
                        label={review.label}
                        value={review.value}
                    />
                ))}
            </Col>
        </Row>
    );
}

ReviewStatistic.propTypes = {
    reviews: PropTypes.array.isRequired,
    totalRating: PropTypes.number.isRequired,
    totalReviews: PropTypes.number.isRequired,
};

ProgressGroup.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default memo(ReviewStatistic);
