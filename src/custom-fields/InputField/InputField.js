import classNames from "classnames/bind";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

import styles from "./InputField.module.scss";

const cx = classNames.bind(styles);

function InputField({
    field,
    form,
    type = "text",
    disabled = false,
    placeholder = "",
    min = 1,
    label = "",
}) {
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup className={cx("form-group")}>
            {label && <Label>{label}</Label>}
            <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                min={type === "number" ? min : undefined}
                invalid={showError}
            />
            {showError && <ErrorMessage name={name} component={FormFeedback} />}
        </FormGroup>
    );
}

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    min: PropTypes.number,
};

export default InputField;
