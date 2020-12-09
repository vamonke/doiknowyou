import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text } from "rebass";
import { Textarea, Input } from "@rebass/forms";
import { Field } from "formik";

import { IconButton } from "../atoms";
import { QUESTIONS_COUNT } from "../constants";

import {
  RandomQuestion,
  LobbySelectOptions,
  LobbyQuestionOptions,
  LobbyPrevNext,
  QuestionTags
} from "../molecules";

const placeholderMapping = [
  'Write a question to get to know another player (Hint: press "Random")',
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
  const [showTags, setShowTags] = useState(false);
  const genericQuestions = questionBank
    ? questionBank.filter(({ tags }) => tags.includes("general"))
    : [];

  return (
    <Box variant="container">
      <Box variant="card.top.xsmall">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="medium">
            {`Question ${questionNo + 1}`}
            <Text display={["none", "inline"]}>{` of ${QUESTIONS_COUNT}`}</Text>
          </Text>
          <Flex>
            <RandomQuestion
              questionNo={questionNo}
              questionBank={genericQuestions}
              setFieldValue={setFieldValue}
            />
            <IconButton
              icon={showTags ? "chevron-up" : "chevron-down"}
              onClick={() => {
                setShowTags(!showTags);
              }}
            />
          </Flex>
        </Flex>

        {showTags && (
          <QuestionTags
            questionNo={questionNo}
            questionBank={questionBank}
            setFieldValue={setFieldValue}
          />
        )}

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

      <Box variant="card.bottom.xsmall">
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

        <Box variant="hr" mb={24} />

        <LobbyPrevNext questionNo={questionNo} prev={prev} next={next} />
      </Box>
    </Box>
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
