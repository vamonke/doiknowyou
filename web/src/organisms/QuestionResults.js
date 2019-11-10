import React from "react";
import { Box, Card, Text, Button } from "rebass";

import { ResultsTable } from "../molecules";

const QuestionResults = ({ question, players, hide }) => {
  const {
    options,
    answers,
    round,
    correctAnswer,
    text,
    recipientId
  } = question;
  const { name: recipientName } =
    players.find(player => player._id === recipientId) || {};

  const displayCorrect = () => {
    if (!correctAnswer || correctAnswer.length === 0) {
      return "-";
    }
    const correctAnswers = correctAnswer
      .map(correct => options[correct])
      .filter((v, i, a) => a.indexOf(v) === i);
    if (correctAnswers.length === 1) {
      return correctAnswers[0];
    }
    return correctAnswers.map((answer, index) => (
      <div key={index}>
        {answer}
        {correctAnswers.length - 1 !== index && <hr />}
      </div>
    ));
  };

  return (
    <>
      <Box variant="orange.card.small">
        <Box variant="modal.header">{"Round " + round + " results"}</Box>
      </Box>
      <Box variant="modal.content" textAlign="center">
        <Text fontSize={2} mt={1} mb={3}>
          {text}
        </Text>
        <Card display="inline-block" minWidth={150} mb={3}>
          <Text variant="blackSmall">{recipientName}:</Text>
          <Box fontSize={3}>{displayCorrect()}</Box>
        </Card>
        {options && options.length > 0 && (
          <ResultsTable
            options={options}
            answers={answers}
            correctAnswer={correctAnswer}
            players={players}
            recipientId={recipientId}
          />
        )}
        <Button onClick={hide} width={1} mt={3}>
          Continue
        </Button>
      </Box>
    </>
  );
};

export default QuestionResults;
