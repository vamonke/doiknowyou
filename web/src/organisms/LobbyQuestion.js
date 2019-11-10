import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text } from "rebass";
import { Textarea, Input } from "@rebass/forms";
import { Field } from "formik";

import {
  RandomQuestion,
  LobbySelectOptions,
  LobbyQuestionOptions,
  LobbyPrevNext
} from "../molecules";

const placeholderMapping = [
  'Write a question to get to know other players (Hint: press "Random")',
  "You can choose different types of answers for your question",
  "You can leave a question blank too!"
];

// Lobby question and options component
const LobbyQuestion = props => {
  const {
    type,
    options,
    questionNo,
    questionBank,
    handleChange,
    setFieldValue,
    prev,
    next
  } = props;

  return (
    <>
      <Box variant="orange">
        <Box variant="orange.card">
          <Flex justifyContent="space-between" pt={[1, 1, 0]}>
            <Text fontWeight="medium" fontSize={3}>
              {`Question ${questionNo + 1} of 3`}
            </Text>
            <RandomQuestion
              questionNo={questionNo}
              questionBank={questionBank}
              setFieldValue={setFieldValue}
            />
          </Flex>

          <Box mx={-2}>
            <Field
              name={`questions[${questionNo}].text`}
              render={({ field }) => (
                <Textarea
                  {...field}
                  sx={{ resize: "vertical" }}
                  placeholder={placeholderMapping[questionNo]}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      <Box px={[0, 2, 3]}>
        <Box variant="card.bottom" pt={[0, 0, 0]} pb={[3, 3, 24, 28]}>
          <Box py={3}>
            <LobbySelectOptions
              questionNo={questionNo}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Box>

          {options && (
            <LobbyQuestionOptions options={options} questionNo={questionNo} />
          )}

          {type === "players" && (
            <Input placeholder="Player names as options" disabled />
          )}

          {type === "open" && (
            <Input placeholder="Open-ended (best answer selected)" disabled />
          )}

          <LobbyPrevNext questionNo={questionNo} prev={prev} next={next} />
        </Box>
      </Box>
    </>
  );
};

LobbyQuestion.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  questionNo: PropTypes.number.isRequired,
  questionBank: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.string
    })
  ),
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default LobbyQuestion;
