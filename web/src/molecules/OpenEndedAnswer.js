import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "rebass";

const OpenEndedAnswer = ({ question, recipientName }) => {
  const { recipientAnswering, options } = question;

  const waitingMsg =
    "Waiting for " +
    (recipientAnswering
      ? recipientName + " to choose"
      : "Waiting for other players");

  return (
    <>
      <Box fontStyle="italic" mb={3}>
        {waitingMsg}
      </Box>
      {options.map((option, i) => (
        <Text variant="tag" key={i}>
          {option}
        </Text>
      ))}
    </>
  );
};

OpenEndedAnswer.propTypes = {
  question: PropTypes.shape({
    recipientAnswering: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.string
    ),
  }).isRequired,
  recipientName: PropTypes.string.isRequired
};

export default OpenEndedAnswer;
