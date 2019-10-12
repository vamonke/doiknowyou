import React, { useState } from "react";
import { Box, Text, Button } from "rebass";
import { withFormik } from 'formik';

import Question from "../molecules/Question";

const QuestionsForm = props => {
  const {
    handleSubmit,
    onNotReady,
    values,
    questionBank,
    handleChange,
    setFieldValue
  } = props;
  const { questions } = values;
  const [currentQn, setCurrentQn] = useState(0);

  const prev = () => {
    setCurrentQn(Math.max(currentQn - 1, 0));
  };

  const edit = () => {
    onNotReady();
    setCurrentQn(0);
  };

  const next = () => {
    if (currentQn === 2) {
      handleSubmit();
    }
    setCurrentQn((currentQn + 1) % 4);
  };

  return (
    <>
      {questions.map((question, questionNo) =>
        currentQn === questionNo && (
          <Question
            {...question}
            key={questionNo}
            questionNo={questionNo}
            prev={prev}
            next={next}
            questionBank={questionBank}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
        )
      )}

      {currentQn === 3 && (
        <Box py={5} textAlign="center">
          <Text mb={3}>Waiting for other players</Text>
          <Button variant="secondary" onClick={edit}>
            Edit questions
          </Button>
        </Box>
      )}
    </>
  );
};

const trim = questions =>
  questions
  .filter(question =>
    question.text &&
    question.options.filter(Boolean).length > 1
  )
  .map(question => ({
    text: question.text,
    options: question.options.filter(Boolean)
  }))
;

const initialValues = {
  questions: [
    {
      text: "",
      type: "custom",
      options: ["", ""]
    },
    {
      text: "",
      type: "custom",
      options: ["", ""]
    },
    {
      text: "",
      type: "custom",
      options: ["", ""]
    },
  ],
};

const formOptions = {
  mapPropsToValues: props => ({
    ...initialValues,
    ...props,
  }),
  handleSubmit: async values => {
    const { onReady, questions } = values;
    console.log(questions);
    console.log(trim(questions));
    onReady();
  },
  displayName: "QuestionsForm"
};

export default withFormik(formOptions)(QuestionsForm);
