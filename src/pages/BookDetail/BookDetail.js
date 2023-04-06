import classNames from "classnames/bind";
import { useEffect, useState } from "react";
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
import Comment from "components/Comment";
import Loader from "components/Loader";
import Separator from "components/Separator";
import { useAxiosClient } from "hooks";
import AddCartForm from "./AddCartForm";
import styles from "./BookDetail.module.scss";
import CommentForm from "./CommentForm";

const cx = classNames.bind(styles);

function BookDetail() {
    const axiosClient = useAxiosClient();
    const [tabActive, setTabActive] = useState("summary");
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);

    const { slug } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);

            const url = bookApiURL.get(slug);
            const res = await axiosClient.get(url);

            setBook(res);
            setLoading(false);
        };

        fetchBook();
    }, [slug, axiosClient]);

    if (loading) return <Loader />;

    return (
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
                                <div className="mb-2">
                                    <StarRatings
                                        rating={book?.rating}
                                        starRatedColor="#fed900"
                                        starHoverColor="#e94560"
                                        starDimension="20px"
                                        starSpacing="2px"
                                    />
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
                                        onClick={() => setTabActive("summary")}
                                    >
                                        Tóm tắt
                                    </NavLink>
                                </NavItem>
                                <NavItem className={cx("tab-item")}>
                                    <NavLink
                                        className={cx("tab-link", {
                                            active: tabActive === "comment",
                                        })}
                                        onClick={() => setTabActive("comment")}
                                    >
                                        Đánh giá
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
                                    tabId="comment"
                                    className={cx("tab-content")}
                                >
                                    <CommentForm />
                                    <div className={cx("comment-wrapper")}>
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </Col>
            </Row>

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
    );
}

export default BookDetail;
