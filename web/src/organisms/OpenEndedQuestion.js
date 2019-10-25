import React from "react";
import { Box, Text } from "rebass";
import OpenEndedAnswer from "../molecules/OpenEndedAnswer";

const OpenEndedQuestion = props => {
  const {
    question,
    recipient,
    isRecipient,
    handleSubmit
  } = props;
  const { text, status } = question;
  const disabled = status !== "asking";

  return (
      <Box variant="relative" textAlign="center">

      <Box fontSize={4} mb={3} mx={-3} p={4} pt={2} sx={{ borderBottom: "1px solid black" }}>
        <Text mb={3}>
          {text}
        </Text>
        <Text>
          {recipient.name}: <Box variant="line"></Box>
        </Text>
      </Box>

      <Box variant="relative">
        {disabled &&
          <Box variant="whiteOverlay" />
        }
        <OpenEndedAnswer
          question={question}
          isRecipient={isRecipient}
          recipientName={recipient.name}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};

export default OpenEndedQuestion;
