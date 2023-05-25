import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ScrollableFeed from "react-scrollable-feed";

import images from "assets/images";
import Message from "components/Message";
import ChatForm from "../ChatForm";
import styles from "./SingleChat.module.scss";

const cx = classNames.bind(styles);

function SingleChat({ userInfo, onBack, messages, chatId, socket }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <MdOutlineKeyboardArrowLeft
                    size={28}
                    onClick={onBack}
                    className={cx("back-btn")}
                />
                <div className={cx("user")}>
                    <div className={cx("user-avatar")}>
                        <img
                            src={
                                userInfo?.avatar
                                    ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${userInfo?.avatar}`
                                    : images.user
                            }
                            alt={userInfo?.username}
                        />
                    </div>
                    <span className={cx("username")}>{userInfo?.username}</span>
                </div>
            </div>
            <div className={cx("main")}>
                <ScrollableFeed className="h-100">
                    {messages?.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                </ScrollableFeed>
            </div>
            <ChatForm chatId={chatId} socket={socket} />
        </div>
    );
}

SingleChat.propTypes = {
    userInfo: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default SingleChat;
