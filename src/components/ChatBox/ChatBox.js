import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { BsChatSquare } from "react-icons/bs";
import { Badge, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

import styles from "./ChatBox.module.scss";
import ChatForm from "components/ChatForm";
import Message from "components/Message";
import { useAxiosAuth } from "hooks";
import chatApiURL from "api/chatApiURL";
import Button from "components/Button";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ChatBox() {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);

    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isCreateChatSuccess, setIsCreateChatSuccess] = useState(false);

    const toggleShowMessages = () => setShowMessages((prev) => !prev);

    const handleCreateChat = async () => {
        try {
            const url = chatApiURL.getAllOrCreateChat();
            await axiosAuth.post(
                url,
                {},
                {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                }
            );
            setIsCreateChatSuccess(true);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    useEffect(() => {
        if (showMessages) {
            const fetchChat = async () => {
                const url = chatApiURL.getChatOfUser(user?._id);
                const res = await axiosAuth.get(url, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                setMessages(res.data);
            };

            if (isCreateChatSuccess) {
                setIsCreateChatSuccess(false);
            }

            fetchChat();
        }
    }, [
        user?._id,
        isCreateChatSuccess,
        showMessages,
        user?.accessToken,
        axiosAuth,
    ]);

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
                    {messages ? (
                        <>
                            <div className={cx("main")}>
                                <ScrollableFeed className="h-100">
                                    {messages.map((message, index) => (
                                        <Message
                                            key={index}
                                            message={message}
                                        />
                                    ))}
                                </ScrollableFeed>
                            </div>
                            <ChatForm chatId={user?._id} />
                        </>
                    ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <Button primary onClick={handleCreateChat}>
                                Bắt đầu
                            </Button>
                        </div>
                    )}
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
}

export default ChatBox;
