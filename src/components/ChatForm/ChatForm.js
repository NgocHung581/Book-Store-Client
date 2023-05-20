import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./ChatForm.module.scss";
import Button from "components/Button";
import InputField from "custom-fields/InputField";
import { useAxiosAuth } from "hooks";
import chatApiURL from "api/chatApiURL";

const cx = classNames.bind(styles);

function ChatForm({ chatId }) {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);

    const initialValues = {
        message: "",
    };

    const handleSubmitForm = async (values, { resetForm }) => {
        const url = chatApiURL.sendMessage(chatId);
        await axiosAuth.post(url, values, {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
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
