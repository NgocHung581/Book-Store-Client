import classNames from "classnames/bind";
import { memo, useContext } from "react";

import ReviewItem from "../ReviewItem";
import styles from "./ReviewList.module.scss";
import { ReviewContext } from "../Review/Review";

const cx = classNames.bind(styles);

function ReviewList() {
    const { reviews } = useContext(ReviewContext);

    return (
        <div className={cx("wrapper")}>
            {reviews?.length > 0 ? (
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

export default memo(ReviewList);
