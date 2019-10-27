import React from "react";
import PropTypes from "prop-types";
import { Button } from "rebass";

// Lobby generate random question
const randomQuestion = props => {
  const {
    questionNo,
    questionBank,
    setFieldValue
  } = props;

  const generateQuestion = () => {
    const { _id, text, type, options } = questionBank[
      Math.floor(Math.random() * questionBank.length)
    ];

    const randomQuestion = {
      text,
      type,
      options: type === "yesno" ? ["Yes", "No"] : options,
      randomQuestionId: _id
    };

    setFieldValue(`questions[${questionNo}]`, randomQuestion);
  };

  return (
    <Button variant="link" onClick={generateQuestion}>
      Random
    </Button>
  );
};

randomQuestion.propTypes = {
  questionNo: PropTypes.number.isRequired,
  questionBank: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.string
      ),
      type: PropTypes.string,
    })
  ).isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default randomQuestion;
