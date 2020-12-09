import React, { useState } from "react";
import { withFormik } from "formik";
// import { motion, AnimatePresence } from "framer-motion";
import { Box } from "rebass";

import { Waiting } from "../molecules";
import LobbyQuestion from "./LobbyQuestion";

import { QUESTIONS_COUNT } from "../constants";

// const variants = {
//   enter: direction => ({
//     position: "absolute",
//     x: direction < 0 ? "-100%" : "100%"
//   }),
//   center: {
//     position: "relative",
//     x: 0
//   },
//   exit: direction => ({
//     position: "absolute",
//     x: direction < 0 ? "100%" : "-100%"
//   })
// };

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

  // add direction to array to use animation
  const [[currentQnNo], setCurrentQnNo] = useState([
    isReady ? QUESTIONS_COUNT : 0,
    0
  ]);

  const edit = () => {
    onNotReady();
    setCurrentQnNo([0, -1]);
  };

  const prev = () => {
    setCurrentQnNo([Math.max(currentQnNo - 1, 0), -1]);
  };

  const next = () => {
    if (currentQnNo === QUESTIONS_COUNT - 1) {
      handleSubmit();
    }
    setCurrentQnNo([currentQnNo + 1, 1]);
  };

  while (questions.length < QUESTIONS_COUNT) {
    questions.push(defaultQuestion);
  }

  return (
    <Box style={{ position: "relative" }}>
      {/* <AnimatePresence initial={false} custom={direction}>
        <motion.div
          style={{ width: "100%", padding: 16, boxSizing: "border-box" }}
          key={currentQnNo}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          transition={{ ease: "backOut", duration: 0.4 }}
        > */}
      {currentQnNo === QUESTIONS_COUNT ? (
        <Waiting edit={edit} />
      ) : (
        <LobbyQuestion
          {...questions[currentQnNo]}
          key={currentQnNo}
          questionNo={currentQnNo}
          questionBank={questionBank}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          prev={prev}
          next={next}
        />
      )}
      {/* </motion.div>
      </AnimatePresence> */}

      {/* {currentQnNo !== QUESTIONS_COUNT && (
        <Box
          mt={-3}
          p={3}
          pt={0}
          bg="white"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <QuestionPrevNext questionNo={currentQnNo} prev={prev} next={next} />
        </Box>
      )} */}
    </Box>
  );
};

const defaultQuestion = {
  text: "",
  type: "mcq",
  options: ["", ""]
};

const trim = questions => {
  // Unique options
  questions.forEach(question => {
    if (question.options) {
      question.options = [
        ...new Set(question.options.map(option => option.trim()))
      ];
    }
  });

  return questions.filter(
    question =>
      question.text &&
      (question.type === "players" ||
        question.type === "open" ||
        question.options.filter(Boolean).length > 1)
  );
};

const formOptions = {
  mapPropsToValues: props => props,
  enableReinitialize: false,
  handleSubmit: values => {
    const { onReady, questions } = values;
    onReady(trim(questions));
  },
  displayName: "QuestionsForm"
};

export default withFormik(formOptions)(QuestionsForm);
