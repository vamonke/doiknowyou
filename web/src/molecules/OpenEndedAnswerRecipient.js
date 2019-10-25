import React from "react";
import { Box, Button, Text } from "rebass";
import { Label, Input } from "@rebass/forms";
import { Formik } from "formik";

const AnswerForm = ({ options, onSubmit }) => (
  <Formik
    initialValues={{}}
    onSubmit={onSubmit}
    render={props => {
      const { handleSubmit, handleChange, values } = props;
      const disabled = !Object.values(values).some(Boolean);
      return (
        <form onSubmit={handleSubmit}>
          {options.map((option, index) => (
            <Label key={index} sx={{ display: "inline-block !important" }}>
              <Input type="checkbox" onChange={handleChange} name={index} />
              <Text variant="tagLarge">{option}</Text>
            </Label>
          ))}
          <Button type="submit" width={1} disabled={disabled} mt={3}>
            Submit
          </Button>
        </form>
      );
    }}
  />
);

const OpenEndedAnswerRecipient = props => {
  const { question, handleSubmit } = props;
  const { recipientAnswering, options } = question;

  if (!recipientAnswering) {
    return <i>Waiting for other players to guess</i>;
  }

  const onSubmit = values => {
    const answer = Object.keys(values)
      .filter(key => values[key])
      .map(Number);
    handleSubmit(answer);
  };

  return (
    <div>
      <Box mb={3}>Pick the best guess(es)</Box>
      <AnswerForm options={options} onSubmit={onSubmit} />
    </div>
  );
};

export default OpenEndedAnswerRecipient;
