import React, { useState } from "react";
import { Box, Text, Button } from "rebass";
import Question from "../molecules/Question";

const QuestionsForm = props => {
  const [currentQn, setCurrentQn] = useState(0);

  const prev = () => {
    setCurrentQn(Math.max(currentQn - 1, 0));
  };

  const edit = () => {
    props.onNotReady();
    setCurrentQn(0);
  };

  const next = () => {
    if (currentQn === 2) {
      props.onReady();
    }
    setCurrentQn((currentQn + 1) % 4);
  };

  return (
    <>
      {[0, 1, 2].map(
        questionNo =>
          currentQn === questionNo && (
            <Question
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

export default QuestionsForm;
