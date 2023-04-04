import classNames from "classnames/bind";

import styles from "./Loader.module.scss";

const cx = classNames.bind(styles);

function Loader() {
    return (
        <div
            className="h-100 d-flex align-items-center justify-content-center"
            style={{ minHeight: "50vh" }}
        >
            <div className={cx("wrapper")}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;
