import React from "react";
import { Box } from "rebass";

import {
  QuestionText,
  OpenEndedAnswerPlayer,
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

          {isRecipient ? (
            <OpenEndedAnswerRecipient
              question={question}
              handleSubmit={handleSubmit}
              answer={answer}
              isClosed={isClosed}
            />
          ) : (
            <OpenEndedAnswerPlayer
              hasAnswered={answer || isClosed}
              question={question}
              handleSubmit={handleSubmit}
              recipientName={recipient.name}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OpenEndedQuestion;
