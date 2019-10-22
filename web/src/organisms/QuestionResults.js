import React from "react";
import { Flex, Box, Card, Heading, Text, Button } from "rebass";

import ResultsTable from "../molecules/ResultsTable";

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
      return '-';
    }
    const correctAnswers = correctAnswer
      .map(correct => options[correct])
      .filter((v, i, a) => a.indexOf(v) === i);
    if (correctAnswers.length === 1) {
      return correctAnswers[0];
    }
    return correctAnswers.map((answer, index) => {
      return (
        <div>
          {answer}
          {correctAnswers.length - 1 !== index && (<hr />)}
        </div>
      );
    });
  }

  return (
    <Card variant="modal">
      <Box variant="modalBody">
        <Heading variant="blackSmall">
          <Flex justifyContent="space-between">
            <Text>
              {'Round ' + round + ' results'}
            </Text>
            <Button type="button" p={0} onClick={hide}>
              X
            </Button>
          </Flex>
        </Heading>
        <Box textAlign="center" mb={3}>
          <Box fontSize={2} mt={1} mb={3}>
            {text}
          </Box>
          <Card display="inline-block">
            <Text variant="blackSmall">
              {recipient.name}
              {'\'s '}
              {correctAnswer && correctAnswer.length > 1 ? 'answers:' : 'answer:'}
            </Text>
            <Box fontSize={4}>
              {displayCorrect()}
            </Box>
          </Card>
        </Box>
        <ResultsTable
          options={options}
          answers={answers}
          correctAnswer={correctAnswer}
          players={players}
        />
        <Button onClick={hide} width={1} mt={3}>
          Continue
        </Button>
      </Box>
    </Card>
  );
};

export default QuestionResults;