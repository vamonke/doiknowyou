import React from "react";
import { Card, Text, Box, Flex } from "rebass";

const correct = (
  <Text variant="correct">
    +1
  </Text>
);

const parseAnswers = (answers, recipientId) => {
  let results = {};
  answers.forEach(({ playerId, option }) => {
    if (playerId !== recipientId) {
      if (results.hasOwnProperty(option)) {
        results[option].push(playerId);
      } else {
        results[option] = [playerId];
      }
    }
  });
  return results;
}

const ResultsTable = ({ players, options, answers, correctAnswer, recipientId }) => {
  const parsedAnswers = parseAnswers(answers, recipientId);
  const playersWhoSelected = option => {
    const answerSet = parsedAnswers[option];
    if (answerSet) {
      return answerSet.map(playerId => {
        const { name } = players.find(({ _id }) => _id === playerId);
        return (
          <div key={name}>
            {name}
          </div>
        );
      });
    }
  }

  return (
    <Card p={0} textAlign="center">
      <Flex variant="row" sx={{ backgroundColor: "black" }} color="white">
        <Box width={1/2} p={2}>
          Option
        </Box>
        <Box width={1/2} p={2}>
          Players
        </Box>
      </Flex>
      {options.map((option, index) => (
        <Flex key={option} variant="row">
          <Box width={1/2} sx={{ borderRight: "1px solid black" }} p={2}>
            {option}
            {correctAnswer.includes(index) && correct}
          </Box>
          <Box width={1/2} p={2}>
            {playersWhoSelected(index)}
          </Box>
        </Flex>
      ))}
    </Card>
  );
};

export default ResultsTable;