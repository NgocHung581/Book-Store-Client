import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import styles from "./SearchResult.module.scss";

const cx = classNames.bind(styles);

function SearchResult({ result }) {
    return (
        <div className={cx("wrapper")}>
            <div className="d-flex align-items-center">
                <div className={cx("img")}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${result?.image}`}
                        alt={result?.name}
                    />
                </div>
                <span className={cx("name")}>{result?.name}</span>
            </div>
            <span className={cx("price")}>
                <NumericFormat
                    value={result?.price}
                    thousandSeparator=","
                    displayType="text"
                    renderText={(value) => `${value} đ`}
                />
            </span>
        </div>
    );
}

SearchResult.propTypes = {
    result: PropTypes.object.isRequired,
};

export default SearchResult;
