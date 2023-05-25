import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import chatApiURL from "api/chatApiURL";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosAuth } from "hooks";
import { setIsFetchChatAgain } from "redux/slices/chatSlice";
import styles from "./ChatForm.module.scss";

const cx = classNames.bind(styles);

function ChatForm({ chatId, socket, setMessages }) {
    const axiosAuth = useAxiosAuth();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const initialValues = {
        message: "",
    };

    const handleSubmitForm = async (values, { resetForm }) => {
        const url = chatApiURL.sendMessage(chatId);
        const res = await axiosAuth.post(url, values, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
        socket.emit("new message", res.data);
        setMessages((prev) => [...prev, res.data]);
        dispatch(setIsFetchChatAgain(true));
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
            {({ handleSubmit }) => {
                return (
                    <Form className={cx("wrapper")} onSubmit={handleSubmit}>
                        <div className="w-100 h-100 d-flex align-items-center me-2">
                            <FastField
                                name="message"
                                component={InputField}
                                autoComplete="off"
                                groupClassName={cx("form-group")}
                                placeholder="Nhập tin nhắn ..."
                            />
                        </div>
                        <Button
                            type="submit"
                            primary
                            className={cx("send-btn")}
                        >
                            <AiOutlineSend />
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

ChatForm.propTypes = {
    chatId: PropTypes.string.isRequired,
};

export default ChatForm;
