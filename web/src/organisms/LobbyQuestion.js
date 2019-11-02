import React from "react";
import PropTypes from "prop-types";
import { Flex, Text } from "rebass";
import { Textarea, Input } from "@rebass/forms";
import { Field } from "formik";

import {
  RandomQuestion,
  LobbySelectOptions,
  LobbyQuestionOptions
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
    setFieldValue
  } = props;

  return (
    <>
      <Flex justifyContent="space-between" mt={3}>
        <Text variant="bold">{`Question ${questionNo + 1} of 3`}</Text>
        <RandomQuestion
          questionNo={questionNo}
          questionBank={questionBank}
          setFieldValue={setFieldValue}
        />
      </Flex>

      <Field
        name={`questions[${questionNo}].text`}
        render={({ field }) => (
          <Textarea
            {...field}
            variant="input"
            sx={{ resize: "vertical" }}
            placeholder={placeholderMapping[questionNo]}
          />
        )}
      />

      <LobbySelectOptions
        questionNo={questionNo}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />

      {options && (
        <LobbyQuestionOptions options={options} questionNo={questionNo} />
      )}

      {type === "players" && <Input placeholder="Players" disabled />}

      {type === "open" && (
        <Input placeholder="Open-ended (best answer selected)" disabled />
      )}
    </>
  );
};

LobbyQuestion.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  questionNo: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
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
