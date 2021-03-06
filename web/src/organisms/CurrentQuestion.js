import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Button, Text } from "rebass";
import { motion } from "framer-motion";

import { QuestionText } from "../molecules";

const fill = {
  selected: {
    // clipPath: "circle(100% at center)",
    opacity: [0, 1, 1, 1],
    scale: [0, 1, 1.1, 1],
    transition: {
      duration: 0.3,
      type: "easeInOut"
    }
  },
  secondary: {
    // clipPath: "circle(50% at center)",
    opacity: [1, 0, 0, 0],
    scale: [1, 0, 0, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const fillStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  borderRadius: 15,
  background: "linear-gradient(90deg, #F09819, #FF512F)"
};

const CurrentQuestion = props => {
  const {
    question,
    recipientName,
    isRecipient,
    answer,
    handleClick,
    timer
  } = props;
  const { text, options, status, round } = question;
  const disabled = status !== "asking";
  const getVariant = index => (index === answer ? "selected" : "option");
  const multiline =
    options.length === 2 && options.every(option => option.length < 10);

  return (
    <Box textAlign="center">
      <QuestionText
        round={round}
        text={text}
        isRecipient={isRecipient}
        recipientName={recipientName}
        timer={timer}
      />
      <Box variant="container">
        <Box
          variant="card.bottom.xsmall"
          px={[20, 20, 20, 24]}
          pb={[20, 20, 20, 24]}
          pt={[3, 3, 3, 24]}
        >
          {disabled && <Box variant="whiteOverlay" />}

          <Text mb={[1, 1, 1, 2]} variant="subtitle">
            {isRecipient
              ? "Answer honestly and let the other players guess your answer"
              : `Guess ${recipientName}’s answer`}
          </Text>

          {multiline ? (
            <Flex mx={-2}>
              {options.map((option, index) => (
                <Box
                  width={1 / 2}
                  px={2}
                  key={index}
                  sx={{ position: "relative" }}
                >
                  <motion.div
                    key={index}
                    style={{ ...fillStyle, top: 16, right: 8, left: 8 }}
                    animate={getVariant(index)}
                    variants={fill}
                  />
                  <Button
                    variant={getVariant(index)}
                    width={1}
                    onClick={() => handleClick(index)}
                    sx={{ position: "relative", zIndex: 2 }}
                  >
                    <Text>{option}</Text>
                  </Button>
                </Box>
              ))}
            </Flex>
          ) : (
            options.map((option, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <motion.div
                  style={{ ...fillStyle, top: 16 }}
                  animate={getVariant(index)}
                  variants={fill}
                />
                <Button
                  sx={{ position: "relative", zIndex: 2 }}
                  variant={getVariant(index)}
                  width={1}
                  onClick={() => handleClick(index)}
                >
                  {option}
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

CurrentQuestion.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string
  }).isRequired,
  recipientName: PropTypes.string,
  isRecipient: PropTypes.bool.isRequired,
  answer: PropTypes.number,
  handleClick: PropTypes.func.isRequired
};

export default CurrentQuestion;
