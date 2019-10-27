import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Text } from "rebass";
import { Input } from "@rebass/forms";

const validate = values => values.guess ? {} : { guess: true };

const OpenEndedAnswerForm = ({ handleSubmit, recipientName }) =>
  <Formik
    initialValues={{ guess: "" }}
    validate={validate}
    onSubmit={values => handleSubmit(values.guess)}
    render={props => {
      const { handleSubmit, handleChange, handleBlur, values, dirty } = props;
      return (
        <form onSubmit={handleSubmit}>
          <Text mb={3}>{`Guess ${recipientName}'s answer`}</Text>
          <Input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.guess}
            name="guess"
            placeholder="Your guess"
          />
          {dirty && (
            <Button type="submit" width={1}>
              Submit
            </Button>
          )}
        </form>
      );
    }}
  />
;

OpenEndedAnswerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  recipientName: PropTypes.string.isRequired
};

export default OpenEndedAnswerForm;
