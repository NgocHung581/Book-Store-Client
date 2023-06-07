import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";

import userApiURL from "api/userApiURL";
import Button from "components/Button";
import { useAxiosAuth } from "hooks";
import { addToCart } from "redux/slices/cartSlice";
import { updateUser } from "redux/slices/userSlice";
import routes from "routes";
import styles from "./BookCard.module.scss";
import cartApiURL from "api/cartApiURL";

const cx = classNames.bind(styles);

function BookCard({ book, isGridLayout = true }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1223px)" });

    const dispatch = useDispatch();

    const existingBookFavorite = user?.favorite?.find(
        (item) => item === book?._id
    );

    const handleSubmitCart = async () => {
        if (book?.in_stock <= 0) return toast.error("Sản phẩm đã hết hàng.");

        const url = cartApiURL.getAllOrAddOrUpdate();
        const data = { bookId: book?._id, quantity: 1 };
        const res = await axiosAuth.post(url, data, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
        toast.success(res.message);
        dispatch(addToCart(res.data));
    };

    const handleDeleteFavorite = async () => {
        const url = userApiURL.deleteFavorite(book?._id);
        const res = await axiosAuth.delete(url, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        dispatch(updateUser({ favorite: res.data }));
        toast.success(res.message);
    };

    const handleAddFavorite = async () => {
        const url = userApiURL.getOrAddFavorite();
        const res = await axiosAuth.post(
            url,
            { bookId: book?._id },
            {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            }
        );
        dispatch(updateUser({ favorite: res.data }));
        toast.success(res.message);
    };

    return (
        <div className={cx("wrapper")}>
            {book?.in_stock <= 0 && (
                <div className={cx("sold-out")}>Hết hàng</div>
            )}
            <Row>
                <Col
                    lg={isGridLayout ? 12 : 3}
                    md={isGridLayout ? 12 : 4}
                    xs={isGridLayout ? 12 : 5}
                >
                    <div className={cx("img")}>
                        <Link
                            to={`${routes.book}/${book.slug}`}
                            className={cx("link")}
                        >
                            <img
                                src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${book?.image}`}
                                alt={book?.name}
                            />
                        </Link>
                    </div>
                </Col>
                <Col
                    lg={isGridLayout ? 12 : 9}
                    md={isGridLayout ? 12 : 8}
                    xs={isGridLayout ? 12 : 7}
                >
                    <div className={cx("info")}>
                        <Link
                            to={`${routes.book}/${book.slug}`}
                            className={cx("link")}
                        >
                            <h1 className={cx("name")}>{book?.name}</h1>
                        </Link>
                        <p
                            className={cx("description", {
                                "pe-5": !isGridLayout,
                            })}
                        >
                            {book?.description}
                        </p>
                        <div className="d-flex align-items-center mb-2">
                            <StarRatings
                                rating={book?.totalRating}
                                starRatedColor="#fed900"
                                starDimension={
                                    isTabletOrMobile ? "16px" : "20px"
                                }
                                starSpacing={isTabletOrMobile ? "2px" : "4px"}
                            />
                            <span
                                className="text-muted mt-2 ms-2"
                                style={{ fontSize: "14px" }}
                            >
                                ({book?.reviews?.length} đánh giá)
                            </span>
                        </div>
                        <div className={cx("info-footer")}>
                            <span className={cx("price")}>
                                <NumericFormat
                                    value={book?.price}
                                    thousandSeparator=","
                                    displayType="text"
                                    renderText={(value) => `${value} đ`}
                                />
                            </span>
                            <div className={cx("footer-actions")}>
                                {existingBookFavorite ? (
                                    <Button
                                        outline
                                        className={cx("footer-actions-btn")}
                                        onClick={handleDeleteFavorite}
                                    >
                                        <AiFillHeart
                                            size={isTabletOrMobile ? 20 : 22}
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        outline
                                        className={cx("footer-actions-btn")}
                                        onClick={handleAddFavorite}
                                    >
                                        <AiOutlineHeart
                                            size={isTabletOrMobile ? 20 : 22}
                                        />
                                    </Button>
                                )}
                                <Button
                                    outline
                                    className={cx("footer-actions-btn")}
                                    onClick={handleSubmitCart}
                                >
                                    <BsCartPlus
                                        size={isTabletOrMobile ? 20 : 22}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    isGridLayout: PropTypes.bool,
};

export default BookCard;
