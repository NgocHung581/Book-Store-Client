import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ message }) {
    const { user } = useSelector((state) => state.user);

    return (
        <div
            className={cx("wrapper")}
            style={{
                justifyContent:
                    message?.sender?._id === user?._id
                        ? "flex-end"
                        : "flex-start",
            }}
        >
            <span
                className={cx("content")}
                style={{
                    background:
                        message?.sender?._id === user?._id
                            ? "var(--primary-color)"
                            : "white",
                    color:
                        message?.sender?._id === user?._id ? "white" : "black",
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
