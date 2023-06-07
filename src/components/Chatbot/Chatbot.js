import classNames from "classnames/bind";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import styles from "./Chatbot.module.scss";
import images from "assets/images";

const cx = classNames.bind(styles);

function Chatbot() {
    const [show, setShow] = useState(false);
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        { message: "Xin chào! Tôi là ChatGPT!", sender: "ChatGPT" },
    ]);

    const toggleShow = () => setShow((prev) => !prev);

    const handleSend = async (message) => {
        const newMessage = { message, sender: "user", direction: "outgoing" };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setTyping(true);

        await processMessageToChatGPT(newMessages);
    };

    const processMessageToChatGPT = async (chatMessages) => {
        let apiMessages = chatMessages.map((message) => {
            let role = "";
            if (message.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role, content: message.message };
        });

        const systemMessage = {
            role: "system",
            content: "Explain all concepts like I am 10 years old.",
        };

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...apiMessages],
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => data.json())
            .then((data) => {
                setMessages([
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT",
                    },
                ]);
                setTyping(false);
            });
    };

    return (
        <>
            <Tippy content="ChatGPT" placement="bottom">
                <div className={cx("wrapper")} onClick={toggleShow}>
                    <img src={images.bot} alt="Chat bot" />
                </div>
            </Tippy>
            <Offcanvas
                isOpen={show}
                direction="end"
                toggle={toggleShow}
                style={{ color: "black" }}
            >
                <OffcanvasHeader toggle={toggleShow}>ChatGPT</OffcanvasHeader>
                <OffcanvasBody>
                    <MainContainer>
                        <ChatContainer>
                            <MessageList
                                typingIndicator={
                                    typing ? (
                                        <TypingIndicator content="ChatGPT đang nhập..." />
                                    ) : null
                                }
                            >
                                {messages.map((message, index) => (
                                    <Message key={index} model={message} />
                                ))}
                            </MessageList>
                            <MessageInput
                                placeholder="Nhập câu hỏi của bạn"
                                onSend={handleSend}
                            />
                        </ChatContainer>
                    </MainContainer>
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
}

export default Chatbot;
