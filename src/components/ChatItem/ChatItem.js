import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./ChatItem.module.scss";
import images from "assets/images";

const cx = classNames.bind(styles);

function ChatItem({ onClick }) {
    return (
        <div className={cx("wrapper")} onClick={onClick}>
            <div className={cx("user-avatar")}>
                <img src={images.user} alt="Avatar" />
            </div>
            <div className={cx("detail")}>
                <span className={cx("username")}>Huỳnh Ngọc Hùng</span>
                <span className={cx("message")}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Numquam fugiat quis voluptas, animi inventore ab impedit
                    ratione corrupti? Repudiandae, enim ut sapiente voluptas
                    odio at aperiam harum ratione quisquam suscipit.
                </span>
            </div>
        </div>
    );
}

ChatItem.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ChatItem;
