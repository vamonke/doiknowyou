import React from "react";
import { Flex, Button } from "rebass";

// Store and fetch tags from server
const tags = [
  { name: "Open", value: "open" },
  { name: "Players", value: "players" },
  { name: "This/That", value: "tot" },
  { name: "SG", value: "sg" },
  { name: "Burning Bridges", value: "burn" },
  { name: "Weird", value: "weird" },
  { name: "Food", value: "food" },
  { name: "Would You Rather", value: "wyr" }
  // { name: "Dev", value: "dev" }
];

const QuestionTags = props => {
  const { questionNo, questionBank, setFieldValue } = props;

  const generateQuestion = tag => {
    // TODO: Store as hash map
    const taggedQuestions = questionBank.filter(({ tags }) =>
      tags.includes(tag)
    );

    if (taggedQuestions.length === 0) return;

    const { _id, text, type, options } = taggedQuestions[
      Math.floor(Math.random() * taggedQuestions.length)
    ];

    const randomQuestion = {
      text,
      type,
      options: type === "yesno" ? ["Yes", "No"] : options,
      randomQuestionId: _id
    };

    // console.log(randomQuestion);

    setFieldValue(`questions[${questionNo}]`, randomQuestion);
  };

  return (
    <Flex mt={2} mx={-12} flexWrap="wrap" justifyContent="space-between">
      {tags.map(({ name, value }) => (
        <Button
          key={name}
          variant="blackTag"
          onClick={() => generateQuestion(value)}
        >
          {name}
        </Button>
      ))}
    </Flex>
  );
};

export default QuestionTags;
