import React, { useState } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

import { fetchQuestionBankAll } from "../redux/actions";
import { toggleQuestion } from "../redux/admin";
import { capitalize } from "../utils";

const colorMapping = {
  general: "gray",
  food: "darkyellow"
};

const tags = ["general", "food"];

const QuestionBank = ({ questionBank, dispatch }) => {
  const [keyword, setKeyword] = useState("");
  const [tagFilter, setTagFilter] = useState(null);

  if (!questionBank) {
    dispatch(fetchQuestionBankAll());
    return "";
  }

  const handleOnClick = async questionId => {
    await toggleQuestion(questionId);
    dispatch(fetchQuestionBankAll());
  };

  const onChange = event => {
    const substring = event.target.value;
    if (substring.length > 2) {
      setKeyword(substring.toLowerCase());
    } else {
      setKeyword("");
    }
  };

  let results = questionBank;
  if (keyword)
    results = results.filter(({ text }) =>
      text.toLowerCase().includes(keyword)
    );
  if (tagFilter)
    results = results.filter(({ tags }) => tags.includes(tagFilter));

  return (
    <>
      <Heading>{results.length} questions</Heading>

      <Input
        name="search"
        type="text"
        placeholder="Search"
        onChange={onChange}
        my={3}
      />

      {tags.map(tag => (
        <Button
          onClick={() => setTagFilter(tag)}
          variant="tag.xsmall"
          key={tag}
          mr={2}
          bg={colorMapping[tag]}
        >
          {capitalize(tag)}
        </Button>
      ))}

      <Button
        onClick={() => setTagFilter(null)}
        variant="tag.xsmall"
        bg="darkpurple"
      >
        No filter
      </Button>

      {results.map(({ _id, text, disabled, tags }) => {
        return (
          <Flex mt={2} key={_id} justifyContent="space-between" variant="row">
            <Box>
              <Text as="span" color={disabled ? "gray" : "darkpurple"}>
                {text}
              </Text>
              {tags.map(tag => (
                <Text
                  variant="tag.xsmall"
                  key={tag}
                  mt={1}
                  bg={colorMapping[tag]}
                >
                  {capitalize(tag)}
                </Text>
              ))}
            </Box>
            <Box flexShrink={0} p={2}>
              <Button
                variant="settings"
                bg={disabled ? "green" : "red"}
                onClick={() => handleOnClick(_id)}
              >
                {disabled ? "Enable" : "Disable"}
              </Button>
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(QuestionBank);
