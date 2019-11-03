import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Flex, Box, Heading, Text, Button } from "rebass";
import { Input } from "@rebass/forms";

import { fetchQuestionBank } from "../redux/actions";

const QuestionBank = ({ questionBank, dispatch }) => {
  const [keyword, setKeyword] = useState("");

  if (!questionBank) {
    dispatch(fetchQuestionBank());
    return "";
  }

  const onChange = event => {
    const substring = event.target.value;
    if (substring.length > 2) {
      setKeyword(substring.toLowerCase());
    } else {
      setKeyword("");
    }
  };

  const results = keyword
    ? questionBank.filter(({ text }) => text.toLowerCase().includes(keyword))
    : questionBank;

  return (
    <>
      <Heading>{questionBank.length} questions</Heading>

      <Input
        name="search"
        type="text"
        placeholder="Search"
        onChange={onChange}
        my={3}
      />

      {results.map(({ _id, text }) => {
        return (
          <Flex mt={2} key={_id} justifyContent="space-between" variant="row">
            <Box>{text}</Box>
            <Button flexShrink={0} p={2}>
              Edit
            </Button>
          </Flex>
        );
      })}
    </>
  );
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(QuestionBank);
