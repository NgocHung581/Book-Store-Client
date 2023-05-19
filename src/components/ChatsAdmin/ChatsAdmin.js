import classNames from "classnames/bind";
import { Badge, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { BiMessage } from "react-icons/bi";
import { useState } from "react";

import styles from "./ChatsAdmin.module.scss";
import ChatItem from "components/ChatItem";
import SingleChat from "components/SingleChat";

const cx = classNames.bind(styles);

function ChatsAdmin() {
    const [showMessages, setShowMessages] = useState(false);
    const [isSingleChat, setIsSingleChat] = useState(false);

    const toggleShowMessages = () => {
        setIsSingleChat(false);
        setShowMessages((prev) => !prev);
    };

    return (
        <>
            <div className={cx("wrapper")} onClick={toggleShowMessages}>
                <BiMessage size={20} />
                <Badge color="primary" pill className={cx("badge")}>
                    99
                </Badge>
            </div>
            <Offcanvas
                isOpen={showMessages}
                direction="end"
                toggle={toggleShowMessages}
            >
                {isSingleChat ? (
                    <SingleChat onBack={() => setIsSingleChat(false)} />
                ) : (
                    <>
                        <OffcanvasHeader
                            toggle={toggleShowMessages}
                            style={{ boxShadow: "var(--box-shadow)" }}
                        >
                            Tin nhắn từ khách hàng
                        </OffcanvasHeader>
                        <OffcanvasBody className="p-0">
                            <div className={cx("list")}>
                                <ChatItem
                                    onClick={() => setIsSingleChat(true)}
                                />
                                <ChatItem
                                    onClick={() => setIsSingleChat(true)}
                                />
                            </div>
                        </OffcanvasBody>
                    </>
                )}
            </Offcanvas>
        </>
    );
}

export default ChatsAdmin;
