import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";

import ReviewItem from "../ReviewItem";
import styles from "./ReviewList.module.scss";
import bookApiURL from "api/bookApiURL";
import { useAxiosClient } from "hooks";
import Pagination from "components/Pagination";
import { createReviewReset } from "redux/slices/reviewSlice";

const cx = classNames.bind(styles);

function ReviewList({ star, reviewRef }) {
    const axiosClient = useAxiosClient();

    const { success: successCreateReview } = useSelector(
        (state) => state.review
    );

    const [reviews, setReviews] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 6 });

    const { slug } = useParams();
    const dispatch = useDispatch();

    const handlePageChange = (e) => {
        const pageSelected = e.selected + 1;
        setPagination((prev) => ({ ...prev, page: pageSelected }));
        reviewRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (successCreateReview) {
            dispatch(createReviewReset());
        }

        const fetchReviews = async () => {
            const params = {
                star,
                page: pagination.page,
                limit: pagination.limit,
            };
            const url = bookApiURL.getReviews(slug, params);
            const res = await axiosClient.get(url);
            setReviews(res.data);
        };

        fetchReviews();
    }, [
        slug,
        star,
        pagination.page,
        pagination.limit,
        successCreateReview,
        dispatch,
        axiosClient,
    ]);

    return (
        <div className={cx("wrapper")}>
            {reviews?.results?.length > 0 ? (
                <>
                    <div className={cx("list")}>
                        {reviews?.results?.map((review) => (
                            <ReviewItem key={review._id} review={review} />
                        ))}
                    </div>
                    {reviews?.total_pages > 1 && (
                        <Row className="align-items-center mt-5">
                            <Col
                                lg={12}
                                md={12}
                                xs={12}
                                className="text-center mt-3"
                            >
                                <Pagination
                                    pageCount={reviews?.total_pages}
                                    onPageChange={handlePageChange}
                                    forcePage={pagination?.page - 1}
                                />
                            </Col>
                        </Row>
                    )}
                </>
            ) : (
                <div>Chưa có đánh giá</div>
            )}
        </div>
    );
}

export default memo(ReviewList);
