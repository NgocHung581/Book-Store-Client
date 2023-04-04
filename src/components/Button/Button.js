import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    primary,
    outline,
    text,
    disabled,
    className,
    children,
    to,
    href,
    loading,
    ...props
}) {
    let Component = "button";

    const classes = cx("wrapper", {
        disabled,
        primary,
        text,
        outline,
        [className]: className,
    });

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = "a";
    }

    return (
        <Component disabled={disabled} className={classes} {...props}>
            {loading && <div className={cx("loader", "me-2")}></div>}
            {children}
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    loading: PropTypes.bool,
};

export default Button;
