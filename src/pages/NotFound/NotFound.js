import classNames from "classnames/bind";

import styles from "./NotFound.module.scss";
import images from "assets/images";

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx("wrapper")}>
            <img src={images.notFound} alt="Not Found" />
        </div>
    );
}

export default NotFound;
