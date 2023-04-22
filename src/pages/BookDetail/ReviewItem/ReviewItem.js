import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { Col, Row } from "reactstrap";
import "tippy.js/dist/tippy.css";

import EditReviewForm from "../EditReviewForm";
import styles from "./ReviewItem.module.scss";
import reviewApiURL from "api/reviewApiURL";
import { useAxiosAuth } from "hooks";
import { toast } from "react-toastify";
import {
    createReviewRequest,
    createReviewSuccess,
} from "redux/slices/reviewSlice";

const cx = classNames.bind(styles);

function ReviewItem({ review }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const [editSession, setEditSession] = useState(false);

    const dispatch = useDispatch();

    const handleEditReview = () => {
        setEditSession(true);
    };

    const handleDeleteReview = async () => {
        dispatch(createReviewRequest());
        const url = reviewApiURL.delete(review?._id, {
            bookId: review?.bookId,
        });
        const res = await axiosAuth.delete(url, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        toast.success(res.message);
        dispatch(createReviewSuccess());
    };

    return (
        <div className={cx("wrapper")}>
            <Row className="w-100">
                <Col lg={2} md={3} xs={2}>
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
                            {user?._id === review?.postedBy?._id && (
                                <div className={cx("user-actions")}>
                                    <div className={cx("actions-item")}>
                                        <Tippy content="Sửa" placement="bottom">
                                            <div
                                                className={cx("icon")}
                                                onClick={handleEditReview}
                                            >
                                                <MdOutlineModeEditOutline
                                                    size={20}
                                                />
                                            </div>
                                        </Tippy>
                                    </div>

                                    <div className={cx("actions-item", "ms-2")}>
                                        <Tippy content="Xóa" placement="bottom">
                                            <div
                                                className={cx("icon")}
                                                onClick={handleDeleteReview}
                                            >
                                                <HiOutlineTrash size={20} />
                                            </div>
                                        </Tippy>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
                <Col lg={10} md={9} xs={2}>
                    {editSession ? (
                        <EditReviewForm
                            reviewId={review?._id}
                            content={review?.content}
                            rating={review?.rating}
                            setEditSession={setEditSession}
                        />
                    ) : (
                        <div>
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
                                <div className={cx("actions-item", "ms-4")}>
                                    <Tippy
                                        content="Không thích"
                                        placement="bottom"
                                    >
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
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}
ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
};

export default ReviewItem;
