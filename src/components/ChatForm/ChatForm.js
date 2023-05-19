import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { AiOutlineSend } from "react-icons/ai";

import styles from "./ChatForm.module.scss";
import Button from "components/Button";
import InputField from "custom-fields/InputField";

const cx = classNames.bind(styles);

function ChatForm() {
    const initialValues = {
        message: "",
    };

    const handleSubmitForm = (values, { resetForm }) => {
        console.log(values);
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

export default ChatForm;
