import classNames from "classnames/bind";
import Button from "components/Button";
import { Form, FormGroup, Input } from "reactstrap";

import styles from "./CommentForm.module.scss";

const cx = classNames.bind(styles);

function CommentForm() {
    return (
        <Form className={cx("wrapper")}>
            <div className={cx("avatar")}>
                <img src="https://picsum.photos/200/200" alt="Avatar" />
            </div>
            <FormGroup className={cx("content")}>
                <div className="position-relative">
                    <Input
                        type="text"
                        placeholder="Viết bình luận..."
                        className={cx("input")}
                    />
                    <div className={cx("underline")}></div>
                </div>
                <div className={cx("actions")}>
                    <Button outline className="me-2">
                        Hủy
                    </Button>
                    <Button primary>Bình luận</Button>
                </div>
            </FormGroup>
        </Form>
    );
}

export default CommentForm;
