import React, { useState } from "react";
import { Flex, Box, Text } from "rebass";
import Icon from "react-eva-icons";

import { ResultsTable } from "../molecules";
import { replaceWithName } from "../utils";

const recipientAnswer = (recipientName, options, correctAnswer) => {
  let correct = "No answer selected";

  if (correctAnswer && correctAnswer.length > 0) {
    const correctAnswers = correctAnswer
      .map(correct => options[correct])
      .filter((v, i, a) => a.indexOf(v) === i);
    if (correctAnswers.length === 1) {
      correct = correctAnswers[0];
    }
    correct = correctAnswers.map((answer, index) => (
      <span key={index}>
        {answer}
        {correctAnswers.length - 1 !== index && <hr />}
      </span>
    ));
  }

  return (
    <Box pt={3} textAlign="center">
      <Text fontWeight="medium" as="span">
        {recipientName && `${recipientName}: `}
      </Text>
      {correct}
    </Box>
  );
};

const AnsweredQuestion = ({ question, players }) => {
  const {
    options,
    answers,
    // round,
    correctAnswer,
    text,
    recipientId
  } = question;

  const [expanded, setExpanded] = useState(false);

  const { name: recipientName } =
    players.find(player => player._id === recipientId) || {};

  return (
    <Box variant="row">
      <Flex sx={{ cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
        {/* <Box width="30px">Q{round}</Box> */}
        <Box width="calc(100% - 30px)">
          {/* {text} */}
          {replaceWithName(text, recipientName)}
        </Box>
        <Box height={0} width={30} mt={-1}>
          <div key={expanded ? "icon-up" : "icon-down"}>
            <Icon
              fill="#FA7F00"
              name={expanded ? "chevron-up" : "chevron-down"}
              size="xlarge"
            />
          </div>
        </Box>
      </Flex>

      {expanded && (
        <Box pt={1} mt={2} pb={4} sx={{ borderTop: "1px solid #E2E2E2" }}>
          {recipientAnswer(recipientName, options, correctAnswer)}
          <Box mt={3}>
            <ResultsTable
              options={options}
              answers={answers}
              correctAnswer={correctAnswer}
              players={players}
              recipientId={recipientId}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnsweredQuestion;
