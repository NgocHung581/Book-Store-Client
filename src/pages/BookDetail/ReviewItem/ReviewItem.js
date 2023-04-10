import classNames from "classnames/bind";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import StarRatings from "react-star-ratings";

import styles from "./ReviewItem.module.scss";

const cx = classNames.bind(styles);

function ReviewItem({ review }) {
    const { user } = useSelector((state) => state.user);

    return (
        <div className={cx("wrapper")}>
            <Row className="w-100">
                <Col lg={2}>
                    <div className={cx("user")}>
                        <div className={cx("user-avatar")}>
                            <img
                                src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${review?.postedBy?.avatar}`}
                                alt={review?.name}
                            />
                        </div>
                        <div className={cx("user-info")}>
                            <span className={cx("user-name")}>
                                {user?._id === review?.postedBy?._id
                                    ? "Bạn"
                                    : review?.postedBy?.fullName}
                            </span>
                            <span
                                className="text-muted"
                                style={{ fontSize: "14px" }}
                            >
                                10/04/2023
                            </span>
                        </div>
                    </div>
                </Col>
                <Col lg={10}>
                    <StarRatings
                        rating={review?.rating}
                        starRatedColor="#fed900"
                        starDimension="18px"
                        starSpacing="1px"
                    />
                    <p className={cx("content")}>{review?.content}</p>
                    <div className={cx("actions")}>
                        <div className={cx("actions-item")}>
                            <Tippy content="Thích" placement="bottom">
                                <div className={cx("icon")}>
                                    <AiOutlineLike size={20} />
                                </div>
                            </Tippy>
                            {review?.like?.length > 0 && (
                                <span>{review?.like?.length}</span>
                            )}
                        </div>
                        <div className={cx("actions-item")}>
                            <Tippy content="Không thích" placement="bottom">
                                <div className={cx("icon")}>
                                    <AiOutlineDislike size={20} />
                                </div>
                            </Tippy>
                            {review?.dislike?.length > 0 && (
                                <span
                                    className="text-muted"
                                    style={{ fontSize: "14px" }}
                                >
                                    {review?.dislike?.length}
                                </span>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
};

export default ReviewItem;
