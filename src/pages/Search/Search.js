import classNames from "classnames/bind";
import BookCard from "components/BookCard";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col, Row } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import { useAxiosClient } from "hooks";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
    const axiosClient = useAxiosClient();
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    useEffect(() => {
        if (q) {
            const fetchSearch = async () => {
                const url = bookApiURL.search({ q });
                const res = await axiosClient.get(url);

                setBooks(res.data);
            };

            fetchSearch();
        } else {
            navigate(-1);
        }
    }, [q, navigate, axiosClient]);

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>Kết quả tìm kiếm từ "{q}"</h2>

            <Row>
                {books?.results?.length > 0 ? (
                    books?.results?.map((book) => (
                        <Col key={book._id} lg={3}>
                            <BookCard book={book} />
                        </Col>
                    ))
                ) : (
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
                        <div className={cx("message")}>
                            Không có kết quả tìm kiếm phù hợp với từ khóa của
                            bạn
                        </div>
                        <div>
                            <span className="d-inline-block me-2">
                                Bạn có thể tìm kiếm với từ khóa này trên{" "}
                                <strong>Amazon</strong>
                            </span>
                            <Button
                                primary
                                href={`https://www.amazon.com/s?k=${q}&i=stripbooks-intl-ship`}
                                target="_blank"
                            >
                                Tìm kiếm
                            </Button>
                        </div>
                    </div>
                )}
            </Row>
        </div>
    );
}

export default Search;
