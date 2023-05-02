import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Col, Row } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import BookCard from "components/BookCard";
import Button from "components/Button";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
import { NUMBER_PER_PAGE } from "constants";
import { collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useAxiosClient } from "hooks";
import { useCollection } from "react-firebase-hooks/firestore";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
    const axiosClient = useAxiosClient();

    const [value] = useCollection(collection(db, "searches"));

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSearchAmazon, setLoadingSearchAmazon] = useState(false);

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 2,
    });
    const q = searchParams.get("q");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;

        setSearchParams({ q, page: selectedPage, limit });
    };

    const handleLimitChange = (e) => {
        const selectedLimit = e.value;

        setSearchParams({ q, page, limit: selectedLimit });
    };

    const handleSearchOnAmazon = async () => {
        setLoadingSearchAmazon(true);
        const resultsExisting = value?.docs?.find(
            (doc) => doc.data()?.search === q
        );

        if (resultsExisting && resultsExisting.data().results) {
            localStorage.setItem("search", resultsExisting.id);
            setLoadingSearchAmazon(false);
            return navigate(`/search-on-amazon/${resultsExisting.id}`);
        }

        const url = bookApiURL.searchOnAmazon();
        const res = await axiosClient.post(url, { search: q });
        navigate(`/search-on-amazon/${res.collection_id}`);
        localStorage.setItem("search", res.collection_id);
        setLoadingSearchAmazon(false);
    };

    useEffect(() => {
        if (q) {
            const fetchSearch = async () => {
                setLoading(true);

                const url = bookApiURL.search({ q, page, limit });
                const res = await axiosClient.get(url);

                setBooks(res.data);
                setLoading(false);
            };

            fetchSearch();
        } else {
            navigate(-1);
        }
    }, [q, page, limit, navigate, axiosClient]);

    if (loading) return <Loader />;

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>Kết quả tìm kiếm từ "{q}"</h2>

            {books?.results?.length > 0 ? (
                <>
                    <Row>
                        {books?.results?.map((book) => (
                            <Col key={book._id} lg={3}>
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-4">
                        <Col lg={6}>
                            <div className="d-flex align-items-center h-100">
                                <span className="me-3">
                                    Hiển thị mỗi trang:
                                </span>
                                <Select
                                    options={NUMBER_PER_PAGE}
                                    defaultValue={
                                        limit
                                            ? NUMBER_PER_PAGE.filter(
                                                  (x) => x.value === limit
                                              )
                                            : NUMBER_PER_PAGE[0]
                                    }
                                    onChange={handleLimitChange}
                                    className="w-50"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="text-end">
                                <Pagination
                                    pageCount={books?.total_pages}
                                    onPageChange={handlePageChange}
                                    forcePage={page ? page - 1 : 0}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
                    <div className={cx("message")}>
                        Không có kết quả tìm kiếm phù hợp với từ khóa của bạn
                    </div>
                    <div>
                        <span className="d-inline-block me-2">
                            Bạn có thể tìm kiếm với từ khóa này trên{" "}
                            <strong>Amazon</strong>
                        </span>
                        <Button
                            type="button"
                            primary
                            onClick={handleSearchOnAmazon}
                            loading={loadingSearchAmazon}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
