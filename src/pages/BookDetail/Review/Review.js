import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { createContext, memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Col, Progress, Row } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import { useAxiosClient } from "hooks";
import calculatePercentageRating from "utils/calculatePercentageRating";
import ReviewForm from "../ReviewForm";
import ReviewGroup from "../ReviewGroup";
import styles from "./Review.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createReviewReset } from "redux/slices/reviewSlice";

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

function Review() {
    const axiosClient = useAxiosClient();

    const { success } = useSelector((state) => state.review);
    const [data, setData] = useState({});

    const { slug } = useParams();
    const dispatch = useDispatch();
    const reviewRef = useRef();

    useEffect(() => {
        if (success) {
            dispatch(createReviewReset());
            reviewRef.current.scrollIntoView({ behavior: "smooth" });
        }

        const fetchReviews = async () => {
            const url = bookApiURL.getReviews(slug);
            const res = await axiosClient.get(url);
            setData(res.data);
        };

        fetchReviews();
    }, [slug, success, dispatch, axiosClient]);

    return (
        <ReviewContext.Provider
            value={{ reviews: data?.reviews, bookId: data?._id }}
        >
            <div ref={reviewRef} className={cx("wrapper")}>
                <h2 className={cx("title")}>Đánh giá sản phẩm</h2>
                <Row>
                    <Col lg={6}>
                        <Row>
                            <Col lg={4}>
                                <div className="d-flex flex-column align-items-center">
                                    <div className={cx("total-rating")}>
                                        <span style={{ fontSize: "52px" }}>
                                            {data?.totalRating}
                                        </span>
                                        <span style={{ fontSize: "26px" }}>
                                            /5
                                        </span>
                                    </div>
                                    <StarRatings
                                        rating={data?.totalRating}
                                        starRatedColor="#fed900"
                                        starDimension="20px"
                                        starSpacing="2px"
                                    />
                                    <span
                                        className="text-muted mt-1"
                                        style={{ fontSize: "14px" }}
                                    >
                                        ({data?.reviews?.length} đánh giá)
                                    </span>
                                </div>
                            </Col>
                            <Col lg={8}>
                                {Array(5)
                                    .fill(0)
                                    .map((item, index) => (
                                        <ProgressGroup
                                            key={index}
                                            label={`${index + 1} sao`}
                                            value={calculatePercentageRating(
                                                data?.reviews,
                                                index + 1
                                            )}
                                        />
                                    ))}
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <ReviewForm />
                    </Col>
                </Row>

                <ReviewGroup />
            </div>
        </ReviewContext.Provider>
    );
}

ProgressGroup.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default memo(Review);
