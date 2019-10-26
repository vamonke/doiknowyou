import React from "react";
import { Box, Text } from "rebass";

const OpenEndedAnswer = props => {
  const { question, recipientName } = props;
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

export default OpenEndedAnswer;
