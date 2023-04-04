import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BsCartPlus } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "components/Button";
import routes from "routes/routes";
import styles from "./BookCard.module.scss";
import { addToCart } from "redux/slices/cartSlice";

const cx = classNames.bind(styles);

function BookCard({ book, isGridLayout = true }) {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1223px)" });
    const dispatch = useDispatch();

    const handleSubmitCart = () => {
        if (book?.in_stock <= 0) return toast.error("Sản phẩm đã hết hàng.");
        const values = {
            quantity: 1,
            name: book?.name,
            id: book?._id,
            price: book?.price,
            image: book?.image,
            checked: false,
            slug: book?.slug,
        };
        const cartItem = addToCart(values);
        dispatch(cartItem);
        toast.success("Bạn vừa thêm 1 sản phẩm vào giỏ hàng");
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
                        <div className="mb-2">
                            <StarRatings
                                rating={book?.rating}
                                starRatedColor="#fed900"
                                starHoverColor="#e94560"
                                starDimension={
                                    isTabletOrMobile ? "16px" : "20px"
                                }
                                starSpacing={isTabletOrMobile ? "2px" : "4px"}
                            />
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
