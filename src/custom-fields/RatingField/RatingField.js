import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import { FormFeedback, FormGroup } from "reactstrap";

function RatingField({ field, form }) {
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const handleRatingChange = (rating) => {
        const changeEvent = {
            target: {
                name,
                value: rating,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <FormGroup>
            <StarRatings
                {...field}
                rating={value}
                changeRating={handleRatingChange}
                starRatedColor="#fed900"
                starHoverColor="#fed900"
                starDimension="24px"
                starSpacing="2px"
            />
            {showError && <div className="is-invalid"></div>}
            {showError && <ErrorMessage name={name} component={FormFeedback} />}
        </FormGroup>
    );
}

RatingField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
};

export default RatingField;
