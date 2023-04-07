import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./CommentGroup.module.scss";
import Comment from "../Comment";
import { useAxiosClient } from "hooks";
import reviewApiURL from "api/reviewApiURL";

const cx = classNames.bind(styles);

function CommentGroup({ bookId }) {
    const axiosClient = useAxiosClient();

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const url = reviewApiURL.getAll(bookId);
            const res = await axiosClient.get(url);
            setComments(res.data);
        };

        fetchComments();
    }, [bookId, axiosClient]);

    return (
        <div className={cx("wrapper")}>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))
            ) : (
                <div>Chưa có đánh giá</div>
            )}
        </div>
    );
}

CommentGroup.propTypes = {
    bookId: PropTypes.string.isRequired,
};

export default memo(CommentGroup);
