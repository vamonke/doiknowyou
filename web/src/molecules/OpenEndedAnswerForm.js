import React from "react";
import { Formik } from "formik";
import { Button, Text } from "rebass";
import { Input } from "@rebass/forms";

const OpenEndedAnswerForm = ({ onSubmit, recipientName }) => (
  <Formik
    initialValues={{ guess: "" }}
    onSubmit={onSubmit}
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
);

export default OpenEndedAnswerForm;