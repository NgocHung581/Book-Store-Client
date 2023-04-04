import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import styles from "./ConfirmItem.module.scss";

const cx = classNames.bind(styles);

function ConfirmItem({ item, lg }) {
    return (
        <div className={cx("wrapper", { large: lg })}>
            <div className={cx("left")}>
                <div className={cx("img")}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${item?.image}`}
                        alt={item?.name}
                    />
                </div>
                <div className={cx("info")}>
                    <span className={cx("name")}>{item?.name}</span>
                    <span className={cx("quantity", "text-muted")}>
                        Số lượng: {item?.quantity}
                    </span>
                </div>
            </div>
            <div className={cx("right")}>
                <span className={cx("price")}>
                    <NumericFormat
                        value={item?.price * item?.quantity}
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => `${value} đ`}
                    />
                </span>
            </div>
        </div>
    );
}

ConfirmItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ConfirmItem;
