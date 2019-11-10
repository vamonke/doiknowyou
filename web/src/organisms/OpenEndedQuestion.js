import React from "react";
import { Box, Text } from "rebass";

import {
  QuestionText,
  OpenEndedAnswer,
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
        timer={timer}
      />

      <Box px={[0, 2, 3]}>
        <Box variant="card.bottom">
          {disabled && <Box variant="whiteOverlay" />}

          {isRecipient &&
            (isClosed ? (
              <OpenEndedAnswerRecipient
                question={question}
                handleSubmit={handleSubmit}
                answer={answer}
              />
            ) : (
              <Text
                pt={[24, 2, 2, 0]}
                pb={[3, 2]}
                px={[1, 1, 0]}
                variant="subtitle"
              >
                Waiting for other players to guess
              </Text>
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
    </Box>
  );
};

export default OpenEndedQuestion;
