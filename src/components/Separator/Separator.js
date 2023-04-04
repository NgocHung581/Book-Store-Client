import classNames from "classnames/bind";

import styles from "./Separator.module.scss";

const cx = classNames.bind(styles);

function Separator() {
    return <div className={cx("wrapper")}></div>;
}

export default Separator;
