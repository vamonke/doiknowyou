import React, { useState } from "react";
import { withFormik } from "formik";

import { Waiting } from "../molecules";
import LobbyQuestion from "./LobbyQuestion";

const QUESTIONS_COUNT = 3;

const QuestionsForm = props => {
  const {
    isReady,
    handleSubmit,
    onNotReady,
    values,
    questionBank,
    handleChange,
    setFieldValue
  } = props;
  const { questions } = values;
  const [currentQn, setCurrentQn] = useState(isReady ? QUESTIONS_COUNT : 0);

  const prev = () => {
    setCurrentQn(Math.max(currentQn - 1, 0));
  };

  const edit = () => {
    onNotReady();
    setCurrentQn(0);
  };

  const next = () => {
    if (currentQn === QUESTIONS_COUNT - 1) {
      handleSubmit();
    }
    setCurrentQn((currentQn + 1) % (QUESTIONS_COUNT + 1));
  };

  while (questions.length < QUESTIONS_COUNT) {
    questions.push(defaultQuestion);
  }

  return (
    <>
      {questions.map(
        (question, questionNo) =>
          currentQn === questionNo && (
            <LobbyQuestion
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

      {currentQn === QUESTIONS_COUNT && <Waiting edit={edit} />}
    </>
  );
};

const defaultQuestion = {
  text: "",
  type: "mcq",
  options: ["", ""]
};

const trim = questions =>
  questions.filter(
    question =>
      question.text &&
      (question.type === "players" ||
        question.type === "open" ||
        question.options.filter(Boolean).length > 1)
  );
const formOptions = {
  mapPropsToValues: props => props,
  enableReinitialize: false,
  handleSubmit: values => {
    const { onReady, questions } = values;
    onReady(trim((questions)));
  },
  displayName: "QuestionsForm"
};

export default withFormik(formOptions)(QuestionsForm);
