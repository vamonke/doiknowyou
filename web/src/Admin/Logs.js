import React from "react";
import { connect } from "react-redux";
import { Heading } from "rebass";
// import { Input } from "@rebass/forms";

// import { fetchQuestionBank } from "../redux/actions";

const QuestionBank = ({ questionBank, dispatch }) => {
  return <Heading>Logs go here</Heading>;
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(QuestionBank);
