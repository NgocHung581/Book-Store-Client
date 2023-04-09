import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import Select from "react-select";
import { FormFeedback, FormGroup } from "reactstrap";

function SelectField({
    field,
    form,
    placeholder = "",
    className = "",
    options = [],
}) {
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const selectedOption = options.find((option) => option.value === value);

    const handleSelectChange = (selectedOption) => {
        const selectedValue = selectedOption
            ? selectedOption.value
            : selectedOption;

        const changeEvent = {
            target: {
                name,
                value: selectedValue,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <FormGroup>
            <Select
                {...field}
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder={placeholder}
                className={showError ? `${className} is-invalid` : className}
            />
            {showError && <ErrorMessage name={name} component={FormFeedback} />}
        </FormGroup>
    );
}

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    placeholder: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
};

export default SelectField;
