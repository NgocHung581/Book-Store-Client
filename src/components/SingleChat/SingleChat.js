import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ScrollableFeed from "react-scrollable-feed";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import images from "assets/images";
import styles from "./SingleChat.module.scss";
import ChatForm from "../ChatForm";
import Message from "components/Message";
import chatApiURL from "api/chatApiURL";
import { useAxiosAuth } from "hooks";

const cx = classNames.bind(styles);

function SingleChat({ chatInfo, onBack }) {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatInfo?.chatId) {
            const fetchChat = async () => {
                const url = chatApiURL.getChatOfUser(chatInfo?.chatId);
                const res = await axiosAuth.get(url, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                setMessages(res.data);
            };

            fetchChat();
        }
    }, [chatInfo?.chatId, user?.accessToken, axiosAuth]);

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
                                chatInfo?.avatar
                                    ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${chatInfo?.avatar}`
                                    : images.user
                            }
                            alt={chatInfo?.username}
                        />
                    </div>
                    <span className={cx("username")}>{chatInfo?.username}</span>
                </div>
            </div>
            <div className={cx("main")}>
                <ScrollableFeed className="h-100">
                    {messages.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                </ScrollableFeed>
            </div>
            <ChatForm chatId={chatInfo?.chatId} />
        </div>
    );
}

SingleChat.propTypes = {
    chatInfo: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default SingleChat;
