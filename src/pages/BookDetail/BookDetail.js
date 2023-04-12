import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";

import bookApiURL from "api/bookApiURL";
import BookList from "components/BookList";
import Loader from "components/Loader";
import Separator from "components/Separator";
import { useAxiosClient } from "hooks";
import AddCartForm from "./AddCartForm";
import styles from "./BookDetail.module.scss";
import ReviewForm from "./ReviewForm";
import ReviewGroup from "./ReviewGroup";
import ReviewStatistic from "./ReviewStatistic";

const cx = classNames.bind(styles);

function BookDetail() {
    const axiosClient = useAxiosClient();

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    const [tabActive, setTabActive] = useState("summary");

    const { slug } = useParams();
    const reviewRef = useRef();

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);

            const url = bookApiURL.get(slug);
            const res = await axiosClient.get(url);

            setBook(res.data);
            setLoading(false);
        };

        fetchBook();
    }, [slug, axiosClient]);

    if (loading) return <Loader />;

    return (
        <>
            <Helmet>
                <title>[Sách] {book?.name}</title>
            </Helmet>
            <div className={cx("wrapper")}>
                <Row>
                    <Col lg={6}>
                        <div className={cx("img")}>
                            <img
                                src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${book?.image}`}
                                alt={book?.name}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx("content")}>
                            <h1 className={cx("name")}>{book?.name}</h1>
                            <p className={cx("text-muted", "author")}>
                                Tác giả: {book?.author}
                            </p>
                            <Separator />
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <div className="d-flex align-items-center mb-2">
                                        <StarRatings
                                            rating={book?.totalRating}
                                            starRatedColor="#fed900"
                                            starDimension="20px"
                                            starSpacing="2px"
                                        />
                                        <span
                                            className="text-muted mt-2 ms-2"
                                            style={{ fontSize: "14px" }}
                                        >
                                            ({book?.reviews?.length} đánh giá)
                                        </span>
                                    </div>
                                    <p className={cx("price")}>
                                        <NumericFormat
                                            value={book?.price}
                                            thousandSeparator=","
                                            displayType="text"
                                            renderText={(value) => `${value} đ`}
                                        />
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    {book?.in_stock > 0 && (
                                        <span
                                            className="text-muted me-3"
                                            style={{ fontSize: "14px" }}
                                        >
                                            Kho: {book?.in_stock}
                                        </span>
                                    )}
                                    <span
                                        className={cx(
                                            "stock",
                                            `status-${
                                                book?.in_stock > 0
                                                    ? "available"
                                                    : "unavailable"
                                            }`
                                        )}
                                    >
                                        {book?.in_stock > 0
                                            ? "Còn hàng"
                                            : "Hết hàng"}
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <AddCartForm book={book} />

                            <div className="mt-4 flex-fill d-flex flex-column">
                                <Nav tabs>
                                    <NavItem className={cx("tab-item")}>
                                        <NavLink
                                            className={cx("tab-link", {
                                                active: tabActive === "summary",
                                            })}
                                            onClick={() =>
                                                setTabActive("summary")
                                            }
                                        >
                                            Tóm tắt
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className={cx("tab-item")}>
                                        <NavLink
                                            className={cx("tab-link", {
                                                active: tabActive === "info",
                                            })}
                                            onClick={() => setTabActive("info")}
                                        >
                                            Thông tin sản phẩm
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent
                                    activeTab={tabActive}
                                    className="mt-3 flex-fill overflow-hidden position-relative"
                                >
                                    <TabPane
                                        tabId="summary"
                                        className={cx("tab-content")}
                                    >
                                        <div className={cx("summary")}>
                                            {book?.description}
                                        </div>
                                    </TabPane>
                                    <TabPane
                                        tabId="info"
                                        className={cx("tab-content")}
                                    ></TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div ref={reviewRef} className={cx("review")}>
                    <h2 className={cx("review-title")}>Đánh giá sản phẩm</h2>
                    <Row>
                        <Col lg={6}>
                            <ReviewStatistic
                                reviews={book?.reviews}
                                totalRating={book?.totalRating}
                            />
                        </Col>
                        <Col lg={6}>
                            <ReviewForm bookId={book?._id} />
                        </Col>
                    </Row>

                    <ReviewGroup reviewRef={reviewRef} />
                </div>

                {book?.category?.slug && (
                    <div className="mt-5">
                        <BookList
                            title="Có thể bạn quan tâm"
                            type={book?.category?.slug}
                            limit={10}
                            slug={book?.slug}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default BookDetail;
