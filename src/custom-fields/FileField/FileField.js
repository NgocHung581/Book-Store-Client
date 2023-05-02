import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

import convertToBase64 from "utils/convert";
import styles from "./FileField.module.scss";

const cx = classNames.bind(styles);

function FileField({
    field,
    form,
    label,
    type = "text",
    disabled = false,
    inputClassName = "",
    labelClassName = "",
    setImageFile = () => {},
    setFieldValue = () => {},
}) {
    const { name } = field;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImageFile(base64);

        setFieldValue(name, file);
    };

    return (
        <FormGroup>
            <Input
                id={name}
                {...field}
                value={undefined}
                onChange={handleFileChange}
                type={type}
                disabled={disabled}
                className={inputClassName}
                accept="image/*"
            />
            <Label for={name} className={cx("label", `${labelClassName}`)}>
                {label}
            </Label>
        </FormGroup>
    );
}

FileField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    inputClassName: PropTypes.string,
    setImageFile: PropTypes.func,
    setFieldValue: PropTypes.func,
};

export default FileField;
