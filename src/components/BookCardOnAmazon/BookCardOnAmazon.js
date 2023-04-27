import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./BookCardOnAmazon.module.scss";

const cx = classNames.bind(styles);

function BookCardOnAmazon({ book }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("img")}>
                <img src={book?.image} alt={book?.title} />
            </div>
            <div className={cx("info")}>
                <span className={cx("name")}>{book?.title}</span>
                {book?.rating && (
                    <span>
                        ⭐{book?.rating} ({book?.reviews} reviews)
                    </span>
                )}
                {book?.price && (
                    <div className={cx("price-group")}>
                        <span className={cx("current-price")}>
                            ${book?.price}
                        </span>
                        {book?.previous_price && (
                            <span className={cx("previous-price")}>
                                ${book?.previous_price}
                            </span>
                        )}
                    </div>
                )}
                <ul className={cx("features")}>
                    {book?.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

BookCardOnAmazon.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookCardOnAmazon;
