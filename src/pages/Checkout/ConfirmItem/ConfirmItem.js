import classNames from "classnames/bind";
import { Badge } from "reactstrap";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import styles from "./ConfirmItem.module.scss";

const cx = classNames.bind(styles);

function ConfirmItem({ item }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("info")}>
                <div className={cx("img")}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${item?.book?.image}`}
                        alt="Sách"
                    />
                    <Badge pill className={cx("badge")}>
                        {item.quantity}
                    </Badge>
                </div>
                <span className={cx("name")}>{item?.book?.name}</span>
            </div>
            <span className={cx("price")}>
                <NumericFormat
                    value={item?.book?.price * item.quantity}
                    thousandSeparator=","
                    displayType="text"
                    renderText={(value) => `${value} đ`}
                />
            </span>
        </div>
    );
}

ConfirmItem.protoTypes = {
    item: PropTypes.object.isRequired,
};

export default ConfirmItem;
