import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ message }) {
    const { user } = useSelector((state) => state.user);

    const isSentByYou =
        (message?.sender?._id === user?._id ||
            (message?.sender?._id !== user?._id &&
                message?.sender?.role === "admin")) &&
        user?.role === message?.sender?.role;

    return (
        <div
            className={cx("wrapper")}
            style={{
                textAlign: isSentByYou ? "right" : "left",
            }}
        >
            <span
                className={cx("content")}
                style={{
                    background: isSentByYou ? "var(--primary-color)" : "white",
                    color: isSentByYou ? "white" : "black",
                }}
            >
                {message.content}
            </span>
            {message?.sender?.role === "admin" && user?.role === "admin" && (
                <span
                    className="d-block text-muted mt-1"
                    style={{ fontSize: "12px" }}
                >
                    Được gửi bởi{" "}
                    {(message?.sender?._id === user?._id && "bạn") ||
                        (message?.sender?._id !== user?._id &&
                            message?.sender?.role === "admin" &&
                            message?.sender?.fullName)}
                </span>
            )}
        </div>
    );
}

Message.propTypes = {
    message: PropTypes.object.isRequired,
};

export default Message;
