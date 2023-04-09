import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

import reviewApiURL from "api/reviewApiURL";
import { useAxiosClient } from "hooks";
import ReviewItem from "../ReviewItem";
import styles from "./ReviewList.module.scss";

const cx = classNames.bind(styles);

function ReviewList({ bookId }) {
    const axiosClient = useAxiosClient();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const url = reviewApiURL.getAll(bookId);
            const res = await axiosClient.get(url);
            setReviews(res.data);
        };

        fetchComments();
    }, [bookId, axiosClient]);

    return (
        <div className={cx("wrapper")}>
            {reviews.length > 0 ? (
                <div className={cx("list")}>
                    {reviews.map((review) => (
                        <ReviewItem key={review._id} review={review} />
                    ))}
                </div>
            ) : (
                <div>Chưa có đánh giá</div>
            )}
        </div>
    );
}

ReviewList.propTypes = {
    bookId: PropTypes.string.isRequired,
};

export default memo(ReviewList);
