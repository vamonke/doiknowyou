import React from "react";
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

const style = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "black"
};

const CurrentQuestion = props => {
  const { question, recipient, isRecipient, answer, handleClick } = props;
  const { text, options, status } = question;
  const disabled = status !== "asking";
  const getVariant = index => (index === answer ? "selected" : "secondary");
  const multiline =
    options.length === 2 && options.every(option => option.length < 10);

  return (
    <Box variant="relative" textAlign="center">
      <QuestionText text={text} recipientName={recipient.name} />

      <Box variant="relative">
        {disabled && <Box variant="whiteOverlay" />}

        {!isRecipient && (
          <Text mb={3} variant="subtitle">
            Guess {recipient.name}&apos;s answer
          </Text>
        )}

        {multiline ? (
          <Flex mt={2} mx={-2}>
            {options.map((option, index) => (
              <Box
                width={1 / 2}
                px={2}
                key={index}
                sx={{ position: "relative" }}
              >
                <motion.div
                  style={{ ...style, right: 8, left: 8 }}
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
                style={{ ...style, top: 4, bottom: 4 }}
                animate={getVariant(index)}
                variants={fill}
              />
              <Button
                variant={getVariant(index)}
                width={1}
                my={1}
                onClick={() => handleClick(index)}
                sx={{ position: "relative", zIndex: 2 }}
              >
                {option}
              </Button>
            </Box>
          ))
        )}

        {isRecipient && (
          <Text mt={3} variant="subtitle">
            Answer honestly and let the other players guess your answer
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default CurrentQuestion;
