import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Text } from "rebass";
import { Input } from "@rebass/forms";

const validate = values => (values.answer ? {} : { answer: true });

const RecipientAnswerForm = ({ handleSubmit }) => (
  <Formik
    initialValues={{ answer: "" }}
    validate={validate}
    onSubmit={values => handleSubmit(values.answer)}
    render={props => {
      const { handleSubmit, handleChange, handleBlur, values, dirty } = props;
      return (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.answer}
            name="answer"
            autoFocus
            placeholder="Enter your answer"
            mb={1}
          />
          {dirty && (
            <Button type="submit" width={1} mt={3}>
              {"Next >"}
            </Button>
          )}
        </form>
      );
    }}
  />
);

RecipientAnswerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default RecipientAnswerForm;
