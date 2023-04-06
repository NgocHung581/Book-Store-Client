import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid3X3Gap } from "react-icons/bs";
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

const FILTER_OPTIONS = [
    { value: "", label: "Mới nhất" },
    { value: "asc", label: "Giá tăng dần" },
    { value: "desc", label: "Giá giảm dần" },
];

function Book() {
    const [isGridLayout, setIsGridLayout] = useState(true);
    const [books, setBooks] = useState({});
    const [loading, setLoading] = useState(false);

    const axiosClient = useAxiosClient();

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        type: "desc",
    });
    const sortType = searchParams.get("type");
    const sortBy = searchParams.get("sortBy");
    const page = parseInt(searchParams.get("page"));
    const limit = parseInt(searchParams.get("limit"));

    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            const fetchSpecificCategory = async () => {
                setLoading(true);
                const params = {
                    page: page ? page : 1,
                    limit: limit ? limit : 12,
                    sortBy: sortBy ? sortBy : "createdAt",
                    type: sortType ? sortType : "desc",
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
                    limit: limit ? limit : 12,
                    sortBy: sortBy ? sortBy : "createdAt",
                    type: sortType ? sortType : "desc",
                };

                const url = bookApiURL.getAll(params);
                const res = await axiosClient.get(url);

                setBooks(res.data);
                setLoading(false);
            };

            fetchBooks();
        }
    }, [slug, sortBy, sortType, page, limit, axiosClient]);

    const handleSortChange = (e) => {
        const selectedType = e.value;
        let fieldSort = "price";
        if (!selectedType) {
            fieldSort = "createdAt";
        }

        setSearchParams({
            page: page ? page : 1,
            limit: limit ? limit : 12,
            sortBy: fieldSort,
            type: selectedType ? selectedType : "desc",
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;
        setSearchParams({
            page: selectedPage,
            limit: limit ? limit : 12,
            sortBy: sortBy ? sortBy : "createdAt",
            type: sortType ? sortType : "desc",
        });
    };

    const handleNumPerPageChange = (e) => {
        const selectedOption = e.value;
        setSearchParams({
            page: page ? page : 1,
            limit: selectedOption,
            sortBy: sortBy ? sortBy : "createdAt",
            type: sortType ? sortType : "desc",
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
                        <Select
                            isSearchable={false}
                            styles={{
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    zIndex: 5,
                                }),
                            }}
                            className="flex-fill"
                            options={FILTER_OPTIONS}
                            defaultValue={
                                sortType && sortBy === "price"
                                    ? FILTER_OPTIONS.filter(
                                          (x) => x.value === sortType
                                      )
                                    : FILTER_OPTIONS[0]
                            }
                            onChange={handleSortChange}
                        />
                    </div>
                    <div className={cx("actions-item")}>
                        <label className="me-3">Hiển thị:</label>
                        <Select
                            isSearchable={false}
                            styles={{
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    zIndex: 5,
                                }),
                            }}
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
                            {books?.total_pages > 1 && (
                                <Col
                                    lg={12}
                                    md={12}
                                    xs={12}
                                    className="text-center mt-3"
                                >
                                    <Pagination
                                        pageCount={books?.total_pages}
                                        onPageChange={handlePageChange}
                                        forcePage={page ? page - 1 : 0}
                                    />
                                </Col>
                            )}
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
