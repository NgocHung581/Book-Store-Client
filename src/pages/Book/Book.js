import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid3X3Gap } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { useParams, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Col, Row } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import BookCard from "components/BookCard";
import Button from "components/Button";
import Loader from "components/Loader";
import Pagination from "components/Pagination/Pagination";
import { NUMBER_PER_PAGE } from "constants";
import { useAxiosClient } from "hooks";
import styles from "./Book.module.scss";

const cx = classNames.bind(styles);

function Book() {
    const isMobile = useMediaQuery({ query: "(max-width: 639px)" });
    const [isGridLayout, setIsGridLayout] = useState(true);
    const [books, setBooks] = useState({});
    const [loading, setLoading] = useState(false);

    const axiosClient = useAxiosClient();

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 2,
        sortBy: "price",
        type: null,
    });
    const sortType = searchParams.get("type");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            const fetchSpecificCategory = async () => {
                setLoading(true);
                const params = {
                    page: page ? page : 1,
                    limit: limit ? limit : 2,
                    sortBy: "price",
                    type: sortType,
                };

                const url = bookApiURL.getSpecificCategory(slug, params);
                const res = await axiosClient.get(url);

                setBooks(res.data);
                setLoading(false);
            };

            fetchSpecificCategory();
        } else {
            const fetchBooks = async () => {
                setLoading(true);
                const params = {
                    page: page ? page : 1,
                    limit: limit ? limit : 2,
                    sortBy: "price",
                    type: sortType,
                };

                const url = bookApiURL.getAll(params);
                const res = await axiosClient.get(url);

                setBooks(res.data);
                setLoading(false);
            };

            fetchBooks();
        }
    }, [slug, sortType, page, limit, axiosClient]);

    const handleSortChange = (e) => {
        const selectedType = e.target.value;
        setSearchParams({
            page: page ? page : 1,
            limit: limit ? limit : 2,
            sortBy: "price",
            type: selectedType,
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;
        setSearchParams({
            page: selectedPage,
            limit: limit ? limit : 2,
            sortBy: "price",
            type: sortType,
        });
    };

    const handleNumPerPageChange = (e) => {
        const selectedOption = e.value;
        setSearchParams({
            page: page ? page : 1,
            limit: selectedOption,
            sortBy: "price",
            type: sortType,
        });
    };

    if (loading) return <Loader />;

    return (
        <>
            <Helmet>
                <title>Sách</title>
            </Helmet>
            <div className={cx("wrapper")}>
                <div className={cx("actions")}>
                    <div className={cx("actions-item")}>
                        <label className="me-3">Lọc theo:</label>
                        <select
                            className="form-select w-75"
                            name="sort"
                            value={sortType ? sortType : ""}
                            onChange={handleSortChange}
                        >
                            <option value="">--Chọn---</option>
                            <option value="asc">
                                Giá từ thấp nhất đến cao nhất
                            </option>
                            <option value="desc">
                                Giá từ cao nhất đến thấp nhất
                            </option>
                        </select>
                    </div>
                    <div className={cx("actions-item", "grid")}>
                        <span className={cx("total")}>
                            {books?.total_results} sản phẩm
                        </span>
                        <div className="d-flex align-items-center">
                            <Button
                                className={cx("grid-btn", {
                                    active: isGridLayout,
                                })}
                                onClick={() => setIsGridLayout(true)}
                            >
                                <BsGrid3X3Gap size={20} />
                            </Button>
                            <Button
                                className={cx("grid-btn", {
                                    active: !isGridLayout,
                                })}
                                onClick={() => setIsGridLayout(false)}
                            >
                                <AiOutlineUnorderedList size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
                {books?.results?.length > 0 ? (
                    <>
                        <Row className="gy-4">
                            {books?.results?.map((book) => (
                                <Col
                                    key={book._id}
                                    lg={isGridLayout ? 4 : 12}
                                    md={isGridLayout ? 6 : 12}
                                    xs={isGridLayout ? 6 : 12}
                                >
                                    <BookCard
                                        book={book}
                                        isGridLayout={isGridLayout}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Row className="align-items-center mt-5">
                            <Col lg={6} md={6} xs={12}>
                                <div className="d-flex align-items-center">
                                    <label className="me-3">
                                        Hiện thị mỗi trang:
                                    </label>
                                    <Select
                                        isSearchable={false}
                                        className="flex-fill"
                                        options={NUMBER_PER_PAGE}
                                        defaultValue={
                                            limit
                                                ? NUMBER_PER_PAGE.filter(
                                                      (x) => x.value === limit
                                                  )
                                                : NUMBER_PER_PAGE[0]
                                        }
                                        onChange={handleNumPerPageChange}
                                    />
                                </div>
                            </Col>
                            <Col
                                lg={6}
                                md={6}
                                xs={12}
                                className={
                                    isMobile ? "text-center mt-3" : "text-end"
                                }
                            >
                                <Pagination
                                    pageCount={books?.total_pages}
                                    onPageChange={handlePageChange}
                                    forcePage={page ? page - 1 : 0}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <h2 className={cx("message")}>
                        Không có sản phẩm nào được hiển thị
                    </h2>
                )}
            </div>
        </>
    );
}

export default Book;
