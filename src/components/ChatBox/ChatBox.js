import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { BsChatSquare } from "react-icons/bs";
import { Badge, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

import styles from "./ChatBox.module.scss";
import ChatForm from "components/ChatForm";
import Message from "components/Message";

const cx = classNames.bind(styles);

const TEST = [
    {
        _id: "1",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam fugiat quis voluptas, animi inventore ab impedit ratione corrupti? Repudiandae, enim ut sapiente voluptas odio at aperiam harum ratione quisquam suscipit.",
    },
    {
        _id: "2",
        content: "Lorem ipsum dolor",
    },
];

function ChatBox() {
    const [showMessages, setShowMessages] = useState(false);

    const toggleShowMessages = () => setShowMessages((prev) => !prev);

    return (
        <>
            <Tippy content="Chat với Admin">
                <div className={cx("wrapper")} onClick={toggleShowMessages}>
                    <BsChatSquare size={20} />
                    <Badge className={cx("badge")} pill>
                        99
                    </Badge>
                </div>
            </Tippy>
            <Offcanvas
                isOpen={showMessages}
                direction="end"
                toggle={toggleShowMessages}
            >
                <OffcanvasHeader
                    toggle={toggleShowMessages}
                    style={{ boxShadow: "var(--box-shadow)" }}
                >
                    Chat với Admin
                </OffcanvasHeader>
                <OffcanvasBody className="p-0">
                    <div className={cx("main")}>
                        <ScrollableFeed className="h-100">
                            {TEST.map((message, index) => (
                                <Message key={index} message={message} />
                            ))}
                        </ScrollableFeed>
                    </div>
                    <ChatForm />
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
}

export default ChatBox;
