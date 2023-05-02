import classNames from "classnames/bind";
import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

import styles from "./SelectField.module.scss";

const cx = classNames.bind(styles);

function SelectField({ field, form, options, label, placeholder, disabled }) {
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Input
                type="select"
                {...field}
                disabled={disabled}
                placeholder={placeholder}
                className={cx("input")}
            >
                <option value="">-- Chọn danh mục --</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Input>
            {showError && <ErrorMessage name={name} component={FormFeedback} />}
        </FormGroup>
    );
}

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

export default SelectField;
