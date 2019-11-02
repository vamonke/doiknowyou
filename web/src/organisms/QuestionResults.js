import React from "react";
import { Flex, Box, Card, Heading, Text, Button } from "rebass";

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
  const recipient = players.find(player => player._id === recipientId) || {};

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
      <Heading variant="blackSmall">
        <Flex justifyContent="space-between">
          <Text>{"Round " + round + " results"}</Text>
          <Button type="button" p={0} onClick={hide}>
            ✕
          </Button>
        </Flex>
      </Heading>
      <Box textAlign="center" mb={3}>
        <Box fontSize={2} mt={1} mb={3}>
          {text}
        </Box>
        <Card display="inline-block" minWidth={150}>
          <Text variant="blackSmall">{recipient.name}:</Text>
          <Box fontSize={4}>{displayCorrect()}</Box>
        </Card>
      </Box>
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
    </>
  );
};

export default QuestionResults;
