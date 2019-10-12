import React from "react";
import { Flex, Box, Text, Button } from "rebass";
import { Textarea, Input, Select } from "@rebass/forms";
import { Field, FieldArray } from "formik";

const placeholderMapping = [
  'Write a question to get to know other players (Hint: press "Random")',
  "You can choose different types of answers for your question",
  "You can leave a question blank too!"
];

// Lobby question and options component
const Question = props => {
  const {
    type,
    options,
    questionNo,
    prev,
    next,
    questionBank,
    handleChange,
    setFieldValue
  } = props;
  const firstQuestion = questionNo === 0;
  const lastQuestion = questionNo === 2;

  const setOptionType = event => {
    const type = event.target.value;
    let options = ["", ""];

    if (type === "custom") {
      options = ["", ""];
    } else if (type === "yesno") {
      options = ["Yes", "No"];
    } else if (type === "players" || type === "open") {
      options = undefined;
    }

    setFieldValue(`questions[${questionNo}].options`, options);
    handleChange(event);
  };

  const generateQuestion = () => {
    const randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
    if (randomQuestion.type === "yesno") {
      randomQuestion.options = ["Yes", "No"];
    }
    setFieldValue(`questions[${questionNo}]`, randomQuestion);
  };

  return (
    <>
      <Flex justifyContent="space-between" mt={3}>
        <Text px={1} variant="bold">
          {`Question ${questionNo + 1} of 3`}
        </Text>
        <Button variant="link" onClick={generateQuestion}>
          Random
        </Button>
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

      <Flex justifyContent="space-between">
        <Box variant="bold" py={2}>
          Options
        </Box>
        <Field
          name={`questions[${questionNo}].type`}
          render={({ field }) => {
            // const { field } = props;
            return (
              <Box width={150}>
                <Select
                  {...field}
                  name={`questions[${questionNo}].type`}
                  onChange={setOptionType}
                >
                  <option value="custom">Custom</option>
                  <option value="yesno">Yes/No</option>
                  <option value="players">Players</option>
                  <option value="open">Open-ended</option>
                </Select>
              </Box>
        )}}
        />
      </Flex>

      {options && (
        <FieldArray
          name={`questions[${questionNo}].options`}
          render={arrayHelpers => (
            <>
              {options.map((_, index) => {
                const showDel = options.length > 2;
                return (
                  <Box key={index} variant="relative">
                    <Field
                      name={`questions[${questionNo}].options[${index}]`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          sx={showDel && { paddingRight: "48px" }}
                          placeholder={`Option ${index + 1}`}
                        />
                      )}
                    />
                    {showDel && (
                      <Button
                        variant="inField"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        X
                      </Button>
                    )}
                  </Box>
                );
              })}
              <Button
                variant="dotted"
                onClick={() => arrayHelpers.push("")}
                width={1}
              >
                + Add option
              </Button>
            </>
          )}
        />
      )}

      {type === "players" && <Input placeholder="Players" disabled />}

      {type === "open" && (
        <Input placeholder="Open-ended (best answer selected)" disabled />
      )}

      <Flex mx={-1} mt={3}>
        {firstQuestion ? (
          <Box width={1} px={1}>
            <Button width={1} onClick={next}>
              {"Next >"}
            </Button>
          </Box>
        ) : (
          <>
            <Box width={1 / 2} px={1}>
              <Button variant="secondary" width={1} onClick={prev}>
                {"< Prev"}
              </Button>
            </Box>
            <Box width={1 / 2} px={1}>
              <Button width={1} onClick={next}>
                {lastQuestion ? "Ready" : "Next >"}
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default Question;
