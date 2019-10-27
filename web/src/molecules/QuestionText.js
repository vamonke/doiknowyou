import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "rebass";

const QuestionText = ({ text, recipientName }) => (
  <Box
    fontSize={4}
    mb={3}
    mx={-3}
    p={4}
    pt={2}
    sx={{ borderBottom: "1px solid black" }}
  >
    <Text mb={3}>{text}</Text>
    <Text>
      {recipientName}: <Box variant="line"></Box>
    </Text>
  </Box>
);

QuestionText.propTypes = {
  text: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired
};

export default QuestionText;
