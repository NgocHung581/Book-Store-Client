import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import Pagination from "components/Pagination";
import { useAxiosClient } from "hooks";
import ReviewItem from "../ReviewItem";
import styles from "./ReviewList.module.scss";

const cx = classNames.bind(styles);

function ReviewList({ tabActive }) {
    const axiosClient = useAxiosClient();

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 5,
    });
    const [reviews, setReviews] = useState({});

    const { slug } = useParams();

    const handlePageChange = (e) => {
        const pageSelected = e.selected + 1;
        setPagination((prev) => ({ ...prev, page: pageSelected }));
    };

    useEffect(() => {
        const fetchReviews = async () => {
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                star: tabActive,
            };

            const url = bookApiURL.getReviews(slug, params);
            const res = await axiosClient.get(url);
            setReviews(res.data);
        };

        fetchReviews();
    }, [slug, pagination.page, pagination.limit, tabActive, axiosClient]);

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
                                    forcePage={reviews?.page - 1}
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
