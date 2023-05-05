import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

function RadioField({ field, form, label, passedValue, disabled }) {
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup>
            <Input
                {...field}
                value={passedValue}
                type="radio"
                disabled={disabled}
                checked={value === passedValue}
            />
            <Label className="ms-2">{label}</Label>

            {showError && <div className="is-invalid"></div>}
            {showError && <ErrorMessage name={name} component={FormFeedback} />}
        </FormGroup>
    );
}

RadioField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

export default RadioField;
