import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Flex, Box, Heading, Text, Button } from "rebass";
// import { Input } from "@rebass/forms";

// import { fetchQuestionBank } from "../redux/actions";

const QuestionBank = ({ questionBank, dispatch }) => {
  return <Heading>Logs go here</Heading>;
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(QuestionBank);
