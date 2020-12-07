import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "rebass";
import { QuestionTimer } from "../molecules";

const floatLeft = {
  sx: {
    position: "absolute",
    pt: 2,
    top: [24, 24, 24, 4],
    left: 4,
    color: "white",
    opacity: 0.25,
    fontSize: 2
  }
};

const QuestionText = ({ round, text, recipientName, timer, isRecipient }) => (
  <Box variant="orange">
    <Box variant="orange.card" py={4} px={[4, 4, 4, 5]}>
      {timer && <QuestionTimer {...timer} />}

      {/* {timer ? (
        <Text as="span" {...floatLeft}>
          Q{round}
        </Text>
      ) : (
        <Text color="yellow" fontSize={1}>
          Q{round}
        </Text>
      )} */}

      <Text as="span" fontSize={2} color="grey">
        {"Question for "}
        <Text as="span" color="yellow" fontWeight="medium">
          {recipientName} {isRecipient && "(You)"}
        </Text>
      </Text>

      <Text mt={3} fontSize={[3, 4, 4, 5]} fontWeight="medium">
        {text}
      </Text>
    </Box>
  </Box>
);

QuestionText.propTypes = {
  text: PropTypes.string.isRequired,
  recipientName: PropTypes.string.isRequired
};

export default QuestionText;
