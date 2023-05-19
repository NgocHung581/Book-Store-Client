import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ message }) {
    return (
        <div
            className={cx("wrapper")}
            style={{
                justifyContent: message._id === "1" ? "flex-end" : "flex-start",
            }}
        >
            <span
                className={cx("content")}
                style={{
                    background: message._id === "1" ? "#ffe1e6cc" : "white",
                }}
            >
                {message.content}
            </span>
        </div>
    );
}

Message.propTypes = {
    message: PropTypes.object.isRequired,
};

export default Message;
