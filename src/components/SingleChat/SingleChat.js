import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ScrollableFeed from "react-scrollable-feed";

import images from "assets/images";
import styles from "./SingleChat.module.scss";
import ChatForm from "../ChatForm";
import Message from "components/Message";

const cx = classNames.bind(styles);

const TEST = [
    {
        _id: "1",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam fugiat quis voluptas, animi inventore ab impedit ratione corrupti? Repudiandae, enim ut sapiente voluptas odio at aperiam harum ratione quisquam suscipit.",
    },
    {
        _id: "2",
        content: "Lorem ipsum dolor",
    },
];

function SingleChat({ onBack }) {
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
                        <img src={images.user} alt="Avatar" />
                    </div>
                    <span className={cx("username")}>Huỳnh Ngọc Hùng</span>
                </div>
            </div>
            <div className={cx("main")}>
                <ScrollableFeed className="h-100">
                    {TEST.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                </ScrollableFeed>
            </div>
            <ChatForm />
        </div>
    );
}

SingleChat.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default SingleChat;
