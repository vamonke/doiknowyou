import React, { useState } from "react";
import { Button, Text } from "rebass";

import RecipientAnswerForm from "./RecipientAnswerForm";
import SelectOptionForm from "./SelectOptionForm";
import WriteOrSelect from "./WriteOrSelect";

const OpenEndedAnswerRecipient = props => {
  const { question, handleSubmit, isClosed } = props;
  const { options } = question;

  const [answerMode, setAnswerMode] = useState("");
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const writeAnswer = answerMode === "write";
  // const selectAnswer = answerMode === "select";

  const onAnswer = answer => {
    setWrittenAnswer(answer);
    setAnswerMode("select");
  };

  if (!answerMode) {
    return <WriteOrSelect setAnswerMode={setAnswerMode} />;
  }

  if (writeAnswer) {
    return <RecipientAnswerForm handleSubmit={onAnswer} />;
  }

  if (!isClosed) {
    return <Text variant="subtitle">Waiting for other players to guess</Text>;
  }

  if (!options || options.length === 0) {
    return (
      <>
        <Text mb={3}>{"No options provided :("}</Text>
        <Button type="button" width={1} onClick={() => handleSubmit()}>
          Skip
        </Button>
      </>
    );
  }

  return (
    <>
      <Text mb={3}>
        {options.length > 1
          ? "You may select more than 1 answer"
          : "Select an answer"}
      </Text>
      <SelectOptionForm
        options={options}
        handleSubmit={handleSubmit}
        writtenAnswer={writtenAnswer}
      />
    </>
  );
};

export default OpenEndedAnswerRecipient;
