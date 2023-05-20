import classNames from "classnames/bind";
import TippyHeadless from "@tippyjs/react/headless";
import { useSelector } from "react-redux";

import styles from "./User.module.scss";
import MenuAccount from "../MenuAccount";
import images from "assets/images";
import Popper from "components/Popper";

const cx = classNames.bind(styles);

function User({ menuAccount }) {
    const { user } = useSelector((state) => state.user);

    return (
        <div>
            <TippyHeadless
                offset={[5, 20]}
                placement="top-end"
                interactive
                delay={[300, 300]}
                hideOnClick="mouseenter"
                render={(attrs) => (
                    <div
                        className={cx("account-menu")}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <Popper>
                            <MenuAccount menuAccount={menuAccount} />
                        </Popper>
                    </div>
                )}
            >
                <div className={cx("user-avatar")}>
                    <img
                        src={
                            user?.avatar
                                ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${user?.avatar}`
                                : images.user
                        }
                        alt="Avatar"
                    />
                </div>
            </TippyHeadless>
        </div>
    );
}

export default User;
