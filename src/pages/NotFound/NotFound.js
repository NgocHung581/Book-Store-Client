import classNames from "classnames/bind";

import images from "assets/images";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx("wrapper")}>
            <img src={images.notFound} alt="Not Found" />
        </div>
    );
}

export default NotFound;
