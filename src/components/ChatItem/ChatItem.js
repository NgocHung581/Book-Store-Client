import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./ChatItem.module.scss";
import images from "assets/images";

const cx = classNames.bind(styles);

function ChatItem({ chat, onClick }) {
    const { user } = useSelector((state) => state.user);

    return (
        <div className={cx("wrapper")} onClick={onClick}>
            <div className={cx("user-avatar")}>
                <img
                    src={
                        chat?.user?.avatar
                            ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${chat?.user?.avatar}`
                            : images.user
                    }
                    alt={chat?.user?.fullName}
                />
            </div>
            <div className={cx("detail")}>
                <span className={cx("username")}>{chat?.user?.fullName}</span>
                <span className={cx("message")}>
                    {user?._id === chat?.latestMessage?.sender && "Bạn: "}
                    {chat?.latestMessage?.content}
                </span>
            </div>
        </div>
    );
}

ChatItem.propTypes = {
    chat: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ChatItem;
