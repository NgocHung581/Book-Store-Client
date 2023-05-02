import classNames from "classnames/bind";

import styles from "./SkeletonLoading.module.scss";

const cx = classNames.bind(styles);

function SkeletonLoading() {
    return (
        <div className={cx("card")}>
            <div className={cx("card-img", "skeleton")}></div>
            <div className={cx("card-body")}>
                <p className={cx("card-title", "skeleton")}></p>
                <p className={cx("card-intro", "skeleton")}></p>
                <p className={cx("card-price", "skeleton")}></p>
                <p className={cx("card-rating", "skeleton")}></p>
            </div>
        </div>
    );
}

export default SkeletonLoading;
