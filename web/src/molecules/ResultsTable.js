import React from "react";
import PropTypes from "prop-types";
import { Card, Text, Box, Flex } from "rebass";

const plusOne = <Text variant="correct">+1</Text>;

const parseAnswers = (answers, recipientId) => {
  let results = {};
  answers.forEach(({ playerId, option }) => {
    if (playerId !== recipientId) {
      if (Object.prototype.hasOwnProperty.call(results, option)) {
        results[option].push(playerId);
      } else {
        results[option] = [playerId];
      }
    }
  });
  return results;
};

const ResultsTable = ({
  players,
  options,
  answers,
  correctAnswer,
  recipientId
}) => {
  const parsedAnswers = parseAnswers(answers, recipientId);
  const playersWhoSelected = option => {
    const answerSet = parsedAnswers[option];
    const correct = correctAnswer && correctAnswer.includes(option);
    if (answerSet) {
      return answerSet.map(playerId => {
        const { name } = players.find(({ _id }) => _id === playerId) || {};
        return (
          <div key={name}>
            {name}
            {correct && plusOne}
          </div>
        );
      });
    }
  };
  console.log(options);
  return (
    <Card p={0} pb={1} textAlign="center">
      <Flex variant="row" sx={{ bg: "darkpurple" }} color="white">
        <Box width={1 / 2} p={1}>
          Option
        </Box>
        <Box width={1 / 2} p={1}>
          Players
        </Box>
      </Flex>
      {options.map((option, index) => {
        const correct = correctAnswer && correctAnswer.includes(index);
        return (
          <Flex key={option} variant="row" py={1}>
            <Box width={1 / 2} sx={{ borderRight: "0px solid black" }} p={2}>
              <Text
                as="span"
                color={correct ? "green" : "darkpurple"}
                fontWeight={correct ? "medium" : "body"}
              >
                {option}
              </Text>
            </Box>
            <Box width={1 / 2} p={2}>
              {playersWhoSelected(index)}
            </Box>
          </Flex>
        );
      })}
    </Card>
  );
};

ResultsTable.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      playerId: PropTypes.string,
      option: PropTypes.number
    })
  ),
  correctAnswer: PropTypes.arrayOf(PropTypes.number),
  recipientId: PropTypes.string.isRequired
};

export default ResultsTable;
