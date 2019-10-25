import React from "react";
import { Box, Text, Button } from "rebass";
import { Input } from "@rebass/forms";
import { Formik } from "formik";

const AnswerForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ guess: "" }}
    onSubmit={onSubmit}
    render={props => {
      const { handleSubmit, handleChange, handleBlur, values, dirty } = props;
      return (
        <form onSubmit={handleSubmit}>
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

const OpenEndedAnswer = props => {
  const { question, recipientName, handleSubmit, answer } = props;
  const { recipientAnswering, options } = question;

  const onSubmit = ({ guess }) => {
    handleSubmit(guess);
  };

  if (!answer) {
    return (
      <>
        <Text mb={3}>{`Guess ${recipientName}'s answer`}</Text>
        <AnswerForm onSubmit={onSubmit} />
      </>
    );
  }

  const waitingMsg =
    "Waiting for " +
    (recipientAnswering
      ? recipientName + " to choose"
      : "Waiting for other players");

  return (
    <div>
      <Box fontStyle="italic" mb={3}>
        {waitingMsg}
      </Box>
      {/* {"Guesses: "} */}
      {options.map((option, i) => (
        <Text variant="tag" key={i}>
          {option}
        </Text>
      ))}
    </div>
  );
};

// const formOptions = {
//   mapPropsToValues: props => props,
//   validate,
//   validateOnBlur: false,
//   validateOnChange: false,
//   handleSubmit: async (values, { setSubmitting }) => {
//     const { CurrentQuestion, name, history } = values;
//     const roomNo = await CurrentQuestion(name);
//     setSubmitting(false);
//     history.push("/lobby/" + roomNo);
//   },
//   displayName: "CurrentQuestion"
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     CurrentQuestion: name => dispatch(CurrentQuestion(name))
//   };
// };

export default OpenEndedAnswer;
