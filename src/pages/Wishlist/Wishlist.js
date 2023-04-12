import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import BookCard from "components/BookCard";
import styles from "./Wishlist.module.scss";
import userApiURL from "api/userApiURL";
import { useAxiosAuth } from "hooks";

const cx = classNames.bind(styles);

function Wishlist() {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const url = userApiURL.getOrAddFavorite();
            const res = await axiosAuth.get(url, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            });
            setBooks(res.data);
        };

        fetchBooks();
    }, [user, axiosAuth]);

    return (
        <>
            <Helmet>
                <title>Danh sách yêu thích</title>
            </Helmet>
            <div className={cx("wrapper")}>
                <h2 className={cx("title")}>Bạn đã yêu thích</h2>
                {books?.length > 0 ? (
                    <Row className="gy-4" lg={5}>
                        {books?.map((book) => (
                            <Col lg={2.4} key={book?._id}>
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <h2 className={cx("message")}>
                        Bạn chưa có sản phẩm nào trong danh sách yêu thích
                    </h2>
                )}
            </div>
        </>
    );
}

export default Wishlist;
