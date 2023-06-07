import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { Badge, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import io from "socket.io-client";

import chatApiURL from "api/chatApiURL";
import images from "assets/images";
import ChatForm from "components/ChatForm";
import ChatItem from "components/ChatItem";
import Message from "components/Message";
import { useAxiosAuth } from "hooks";
import { setIsFetchChatAgain } from "redux/slices/chatSlice";
import styles from "./ChatsAdmin.module.scss";

const cx = classNames.bind(styles);

var socket, selectedChatCompare;

function ChatsAdmin() {
    const axiosAuth = useAxiosAuth();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { isFetchChatAgain } = useSelector((state) => state.chat);

    const [showMessages, setShowMessages] = useState(false);
    const [selectedChat, setSelectedChat] = useState("");
    const [chats, setChats] = useState([]);
    const [userInfo, setUserInfo] = useState({
        username: "",
        avatar: "",
    });
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const toggleShowMessages = () => {
        setSelectedChat("");
        setShowMessages((prev) => {
            if (prev === true) {
                selectedChatCompare = "";
            }
            return !prev;
        });
    };

    const handleClickSingleChat = (chat) => {
        setSelectedChat(chat?._id);
        setUserInfo({
            username: chat?.user?.fullName,
            avatar: chat?.user?.avatar,
        });
        setNotifications((prev) =>
            prev.filter((notification) => notification.chat._id !== chat?._id)
        );
    };

    const handleBackSingleChat = () => {
        setSelectedChat("");
        setUserInfo({
            username: "",
            avatar: "",
        });
        selectedChatCompare = "";
    };

    useEffect(() => {
        if (showMessages && !selectedChat) {
            const fetchChats = async () => {
                const url = chatApiURL.getAllOrCreateChat();
                const res = await axiosAuth.get(url, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                setChats(res.data);
                dispatch(setIsFetchChatAgain(false));
            };

            fetchChats();
        }
    }, [
        isFetchChatAgain,
        selectedChat,
        showMessages,
        user?.accessToken,
        dispatch,
        axiosAuth,
    ]);

    useEffect(() => {
        if (showMessages && selectedChat) {
            const fetchChat = async () => {
                const url = chatApiURL.getChatOfUser(selectedChat);
                const res = await axiosAuth.get(url, {
                    headers: { Authorization: `Bearer ${user?.accessToken}` },
                });
                setMessages(res.data);
            };

            fetchChat();
            selectedChatCompare = selectedChat;
        }
    }, [selectedChat, showMessages, user?.accessToken, dispatch, axiosAuth]);

    useEffect(() => {
        socket = io(process.env.REACT_APP_SERVER_BASE_URL);

        socket.emit("setup", user?._id);

        return () => socket.disconnect();
    }, [user?._id]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare !== newMessageReceived?.chat?._id
            ) {
                if (!notifications.includes(newMessageReceived)) {
                    setNotifications((prev) => [...prev, newMessageReceived]);
                    dispatch(setIsFetchChatAgain(true));
                }
            } else {
                setMessages((prev) => [...prev, newMessageReceived]);
            }
        });
    }, []);

    return (
        <>
            <div className={cx("wrapper")} onClick={toggleShowMessages}>
                <BiMessage size={20} />
                <Badge color="primary" pill className={cx("badge")}>
                    {notifications.length}
                </Badge>
            </div>
            <Offcanvas
                isOpen={showMessages}
                direction="end"
                toggle={toggleShowMessages}
            >
                {selectedChat ? (
                    <div className={cx("chat")}>
                        <div className={cx("header")}>
                            <MdOutlineKeyboardArrowLeft
                                size={28}
                                onClick={handleBackSingleChat}
                                className={cx("back-btn")}
                            />
                            <div className={cx("user")}>
                                <div className={cx("user-avatar")}>
                                    <img
                                        src={
                                            userInfo?.avatar
                                                ? `${process.env.REACT_APP_SERVER_IMAGE_URL}/${userInfo?.avatar}`
                                                : images.user
                                        }
                                        alt={userInfo?.username}
                                    />
                                </div>
                                <span className={cx("username")}>
                                    {userInfo?.username}
                                </span>
                            </div>
                        </div>
                        <div className={cx("main")}>
                            <ScrollableFeed className="h-100">
                                {messages?.map((message, index) => (
                                    <Message key={index} message={message} />
                                ))}
                            </ScrollableFeed>
                        </div>
                        <ChatForm
                            chatId={selectedChat}
                            socket={socket}
                            setMessages={setMessages}
                        />
                    </div>
                ) : (
                    <>
                        <OffcanvasHeader
                            toggle={toggleShowMessages}
                            style={{
                                boxShadow: "var(--box-shadow)",
                                color: "black",
                            }}
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
