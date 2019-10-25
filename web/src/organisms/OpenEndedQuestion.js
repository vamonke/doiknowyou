import React from "react";
import { Box, Text } from "rebass";
import OpenEndedAnswer from "../molecules/OpenEndedAnswer";
import OpenEndedAnswerRecipient from "../molecules/OpenEndedAnswerRecipient";

const OpenEndedQuestion = props => {
  const {
    question,
    recipient,
    isRecipient,
    handleSubmit,
    answer
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
        {isRecipient ?
          <OpenEndedAnswerRecipient
            question={question}
            handleSubmit={handleSubmit}
            answer={answer}
          />
        :
          <OpenEndedAnswer
            question={question}
            recipientName={recipient.name}
            handleSubmit={handleSubmit}
            answer={answer}
          />
        }
      </Box>
    </Box>
  );
};

export default OpenEndedQuestion;
