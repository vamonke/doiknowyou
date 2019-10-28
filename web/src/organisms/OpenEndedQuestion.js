import React from "react";
import { Box } from "rebass";

import {
  QuestionText,
  OpenEndedAnswer,
  OpenEndedAnswerForm,
  OpenEndedAnswerRecipient
} from "../molecules";

const OpenEndedQuestion = props => {
  const { question, recipient, isRecipient, handleSubmit, answer } = props;
  const { text, status, isClosed } = question;
  const disabled = status !== "asking";

  return (
    <Box variant="relative" textAlign="center">
      <QuestionText text={text} recipientName={recipient.name} />

      <Box variant="relative">
        {disabled && <Box variant="whiteOverlay" />}

        {isRecipient &&
          (isClosed ? (
            <OpenEndedAnswerRecipient
              question={question}
              handleSubmit={handleSubmit}
              answer={answer}
            />
          ) : (
            <i>Waiting for other players to guess</i>
          ))}

        {!isRecipient &&
          (answer || isClosed ? (
            <OpenEndedAnswer
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
  );
};

export default OpenEndedQuestion;
