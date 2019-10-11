import React, { useState } from "react";
import { Box, Text, Button } from "rebass";
import { connect } from "react-redux";
import { withFormik } from 'formik';

import Question from "../molecules/Question";

const QuestionsForm = props => {
  const { handleSubmit, onNotReady, values } = props;
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


const formOptions = {
  mapPropsToValues: props => ({
    questions: [
      {
        text: "",
        options: ["", ""]
      },
      {
        text: "",
        options: ["", ""]
      },
      {
        text: "",
        options: ["", ""]
      },
    ],
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

const mapDispatchToProps = dispatch => {
  return {
    // createGame: name => dispatch(createGame(name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withFormik(formOptions)(QuestionsForm));
