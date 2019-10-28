import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "rebass";

const OpenEndedAnswer = ({ question, recipientName }) => {
  const { isClosed, options } = question;

  const waitingMsg =
    "Waiting for " +
    (isClosed ? recipientName + " to choose" : "Waiting for other players");

  return (
    <>
      <Box fontStyle="italic">{waitingMsg}</Box>
      {options && options.length > 0 && (
        <Box mt={3}>
          {options.map((option, i) => (
            <Text variant="tag" key={i}>
              {option}
            </Text>
          ))}
        </Box>
      )}
    </>
  );
};

OpenEndedAnswer.propTypes = {
  question: PropTypes.shape({
    isClosed: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired,
  recipientName: PropTypes.string.isRequired
};

export default OpenEndedAnswer;
