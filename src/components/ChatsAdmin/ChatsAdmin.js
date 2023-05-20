import classNames from "classnames/bind";
import { Badge, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { BiMessage } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ChatsAdmin.module.scss";
import ChatItem from "components/ChatItem";
import SingleChat from "components/SingleChat";
import chatApiURL from "api/chatApiURL";
import { useAxiosAuth } from "hooks";

const cx = classNames.bind(styles);

function ChatsAdmin() {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const [showMessages, setShowMessages] = useState(false);
    const [isSingleChat, setIsSingleChat] = useState(false);
    const [chats, setChats] = useState([]);
    const [chatInfo, setChatInfo] = useState({
        chatId: "",
        username: "",
        avatar: "",
    });

    const toggleShowMessages = () => {
        setIsSingleChat(false);
        setShowMessages((prev) => !prev);
    };

    const handleClickSingleChat = (chat) => {
        setIsSingleChat(true);
        setChatInfo({
            chatId: chat?._id,
            username: chat?.user?.fullName,
            avatar: chat?.user?.avatar,
        });
    };

    const handleBackSingleChat = () => {
        setIsSingleChat(false);
        setChatInfo({
            chatId: "",
            username: "",
            avatar: "",
        });
    };

    useEffect(() => {
        if (showMessages) {
            const fetchChats = async () => {
                const url = chatApiURL.getAllOrCreateChat();
                const res = await axiosAuth.get(url, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                setChats(res.data);
            };

            fetchChats();
        }
    }, [showMessages, user?.accessToken, axiosAuth]);

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
                    <SingleChat
                        chatInfo={chatInfo}
                        onBack={handleBackSingleChat}
                    />
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
                                {chats?.map((chat) => (
                                    <ChatItem
                                        key={chat?._id}
                                        chat={chat}
                                        onClick={() =>
                                            handleClickSingleChat(chat)
                                        }
                                    />
                                ))}
                            </div>
                        </OffcanvasBody>
                    </>
                )}
            </Offcanvas>
        </>
    );
}

export default ChatsAdmin;
