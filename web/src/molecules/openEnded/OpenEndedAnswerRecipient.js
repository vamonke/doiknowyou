import React from "react";
import { Box, Button, Text } from "rebass";
import { Label, Input } from "@rebass/forms";
import { Formik } from "formik";
import Icon from "react-eva-icons";

const RecipientForm = ({ options, onSubmit }) => (
  <Formik
    initialValues={{}}
    onSubmit={onSubmit}
    render={props => {
      const { handleSubmit, handleChange, values } = props;
      const disabled = !Object.values(values).some(Boolean);
      return (
        <form onSubmit={handleSubmit}>
          {options.map((option, index) => (
            <Label key={index} sx={{ display: "inline-flex !important" }}>
              <Input type="checkbox" onChange={handleChange} name={index} />
              <Box variant="selectable">
                {values[index] ? (
                  <Text as="span" mb="-4px" key="icon-check" mr={2}>
                    <Icon
                      fill="#FA7F00"
                      name="checkmark-circle-2"
                      size="large" // small, medium, large, xlarge
                    />
                  </Text>
                ) : (
                  <Text as="span" mb="-4px" key="icon-circle" mr={2}>
                    <Icon
                      fill="#BBB"
                      name="radio-button-off"
                      size="large" // small, medium, large, xlarge
                    />
                  </Text>
                )}
                {option}
              </Box>
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
  const { options } = question;

  if (!options || options.length === 0) {
    return (
      <>
        <Box mb={3}>{"No options provided :("}</Box>
        <Button type="button" width={1} onClick={() => handleSubmit()}>
          Skip
        </Button>
      </>
    );
  }

  const onSubmit = values => {
    const answer = Object.keys(values)
      .filter(key => values[key])
      .map(Number);
    handleSubmit(answer);
  };

  return (
    <>
      <Box mb={3}>
        {options.length > 1
          ? "You may select more than 1 answer"
          : "Select an answer"}
      </Box>
      <RecipientForm options={options} onSubmit={onSubmit} />
    </>
  );
};

export default OpenEndedAnswerRecipient;
