import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { BsChatSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { toast } from "react-toastify";
import { Badge, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import io from "socket.io-client";
import "tippy.js/dist/tippy.css";

import chatApiURL from "api/chatApiURL";
import Button from "components/Button";
import ChatForm from "components/ChatForm";
import Message from "components/Message";
import { useAxiosAuth } from "hooks";
import styles from "./ChatBox.module.scss";

const cx = classNames.bind(styles);

var socket, selectedChatCompare;

function ChatBox() {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);

    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isCreateChatSuccess, setIsCreateChatSuccess] = useState(false);
    const [notifications, setNotifications] = useState([]);

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
            selectedChatCompare = user?._id;
            setNotifications([]);
        } else {
            selectedChatCompare = "";
        }
    }, [
        user?._id,
        isCreateChatSuccess,
        showMessages,
        user?.accessToken,
        axiosAuth,
    ]);

    useEffect(() => {
        socket = io(process.env.REACT_APP_SERVER_BASE_URL);

        socket.emit("setup", user?._id);

        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare !== newMessageReceived?.chat?._id
            ) {
                setNotifications((prev) => [...prev, newMessageReceived]);
            } else {
                setMessages((prev) => [...prev, newMessageReceived]);
            }
        });

        return () => socket.disconnect();
    }, [user?._id]);

    return (
        <>
            <Tippy content="Chat với Admin">
                <div className={cx("wrapper")} onClick={toggleShowMessages}>
                    <BsChatSquare size={20} />
                    <Badge className={cx("badge")} pill>
                        {notifications.length}
                    </Badge>
                </div>
            </Tippy>
            <Offcanvas
                isOpen={showMessages}
                direction="end"
                toggle={toggleShowMessages}
                style={{ color: "black" }}
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
                            <ChatForm
                                chatId={user?._id}
                                socket={socket}
                                setMessages={setMessages}
                            />
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
