import classNames from "classnames/bind";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";

import styles from "./Comment.module.scss";

const cx = classNames.bind(styles);

function Comment({ comment }) {
    const { user } = useSelector((state) => state.user);
    console.log(comment);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("avatar")}>
                <img
                    src={`${process.env.REACT_APP_SERVER_IMAGE_URL}/${comment?.postedBy?.avatar}`}
                    alt={comment?.name}
                />
            </div>
            <div className={cx("content")}>
                <h3 className={cx("content-user")}>
                    {user?._id === comment?.postedBy?._id
                        ? "Bạn"
                        : comment?.postedBy?.fullName}
                </h3>
                <p className={cx("content-main")}>{comment?.content}</p>
                <div className={cx("content-actions")}>
                    <div className={cx("actions-item")}>
                        <Tippy content="Thích" placement="bottom">
                            <div className={cx("icon")}>
                                <AiOutlineLike size={20} />
                            </div>
                        </Tippy>
                        {comment?.like?.total > 0 && <span>1</span>}
                    </div>
                    <div className={cx("actions-item")}>
                        <Tippy content="Không thích" placement="bottom">
                            <div className={cx("icon")}>
                                <AiOutlineDislike size={20} />
                            </div>
                        </Tippy>
                        {comment?.dislike?.total > 0 && <span>1</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
Comment.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default Comment;
