import React from "react";
import PropTypes from "prop-types";
import { Text, Button } from "rebass";

const WriteOrSelect = ({ setAnswerMode }) => (
  <>
    <Button width={1} type="button" onClick={() => setAnswerMode("write")}>
      Write your own answer
    </Button>
    <Text py={2}> or </Text>
    <Button width={1} onClick={() => setAnswerMode("select")} type="button">
      Choose the best answer
    </Button>
  </>
);

WriteOrSelect.propTypes = {
  setAnswerMode: PropTypes.func.isRequired
};

export default WriteOrSelect;
