import classNames from "classnames/bind";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";

import styles from "./Comment.module.scss";

const cx = classNames.bind(styles);

function Comment({ comment }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("avatar")}>
                <img src="https://picsum.photos/200/200" alt="Avatar" />
            </div>
            <div className={cx("content")}>
                <h3 className={cx("content-user")}>Huỳnh Ngọc Hùng</h3>
                <p className={cx("content-main")}>Đấy là bình luận</p>
                <div className={cx("content-actions")}>
                    <div className={cx("actions-item")}>
                        <Tippy content="Thích" placement="bottom">
                            <div className={cx("icon")}>
                                <AiOutlineLike size={20} />
                            </div>
                        </Tippy>
                        <span>1</span>
                    </div>
                    <div className={cx("actions-item")}>
                        <Tippy content="Không thích" placement="bottom">
                            <div className={cx("icon")}>
                                <AiOutlineDislike size={20} />
                            </div>
                        </Tippy>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
Comment.propTypes = {
    comment: PropTypes.object,
};

export default Comment;
