import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Button, Text } from "rebass";
import { Input } from "@rebass/forms";

import PlayerWaiting from "./PlayerWaiting";

const validate = values => (values.guess ? {} : { guess: true });

const PlayerAnswerForm = ({ handleSubmit, recipientName }) => (
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
            mb={1}
          />
          {dirty && (
            <Button type="submit" width={1} mt={3}>
              Submit
            </Button>
          )}
        </form>
      );
    }}
  />
);

const OpenEndedAnswerPlayer = props => {
  const component = props.hasAnswered ? PlayerWaiting : PlayerAnswerForm;
  return component(props);
};

OpenEndedAnswerPlayer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  recipientName: PropTypes.string.isRequired
};

export default OpenEndedAnswerPlayer;
