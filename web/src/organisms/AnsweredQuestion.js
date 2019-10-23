import React, { useState } from "react";
import { Flex, Box, Text } from "rebass";

import ResultsTable from "../molecules/ResultsTable";

const AnsweredQuestion = ({ question, players }) => {
  const {
    options,
    answers,
    round,
    correctAnswer,
    text,
    recipientId
  } = question;

  const [expanded, setExpanded] = useState(false);

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
    return correctAnswers.map((answer, index) => 
      <div key={index}>
        {answer}
        {correctAnswers.length - 1 !== index && (<hr />)}
      </div>
    );
  }

  return (
    <>
      <Box sx={{ borderTop: "1px solid black", cursor: "pointer" }} mx={-3} p={3} onClick={() => setExpanded(!expanded)}>
        <Flex>
          <Box width={1/12}>
            Q{round}
          </Box>
          <Box width={10/12} flexGrow={2}>
            {text}
          </Box>
          <Text pl={2}>
            {expanded ? "▲" : "►"}
          </Text>
        </Flex>
      </Box>
      {expanded &&
        <Box sx={{ borderTop: "1px solid black" }} pt={2} pb={4}>
          <Box textAlign="center">
            <Box pt={3} mb={3}>
              <Text fontWeight="medium" display="inline">
                {recipient.name}
                {": "}
              </Text>
              {displayCorrect()}
            </Box>
          </Box>
          <ResultsTable
            options={options}
            answers={answers}
            correctAnswer={correctAnswer}
            players={players}
            recipientId={recipientId}
          />
        </Box>
      }
    </>
  );
};

export default AnsweredQuestion;