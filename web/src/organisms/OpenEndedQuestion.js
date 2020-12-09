import React from "react";
import { Box, Text } from "rebass";

import {
  QuestionText,
  OpenEndedWaiting,
  OpenEndedAnswerForm,
  OpenEndedAnswerRecipient
} from "../molecules";

const OpenEndedQuestion = props => {
  const {
    question,
    recipient,
    isRecipient,
    handleSubmit,
    answer,
    timer
  } = props;
  const { text, status, isClosed, round } = question;
  const disabled = status !== "asking";

  return (
    <Box textAlign="center">
      <QuestionText
        round={round}
        text={text}
        recipientName={recipient.name}
        isRecipient={isRecipient}
        timer={timer}
      />

      <Box variant="container">
        <Box variant="card.bottom.xsmall" py={24}>
          {disabled && <Box variant="whiteOverlay" />}

          {isRecipient &&
            (isClosed ? (
              <OpenEndedAnswerRecipient
                question={question}
                handleSubmit={handleSubmit}
                answer={answer}
              />
            ) : (
              <Text px={[1, 1, 0]} variant="subtitle">
                Waiting for other players to guess
              </Text>
            ))}

          {!isRecipient &&
            (answer || isClosed ? (
              <OpenEndedWaiting
                question={question}
                recipientName={recipient.name}
              />
            ) : (
              <OpenEndedAnswerForm
                question={question}
                handleSubmit={handleSubmit}
                recipientName={recipient.name}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OpenEndedQuestion;
