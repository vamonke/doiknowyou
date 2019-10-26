import React from "react";
import { Flex, Box, Button, Text } from "rebass";

import { QuestionText } from "../molecules";

const CurrentQuestion = props => {
  const {
    question,
    recipient,
    isRecipient,
    answer,
    handleClick
  } = props;
  const { text, options, status } = question;
  const disabled = status !== "asking";
  const getVariant = (index) => index === answer ? "primary" : "secondary";
  const multiline = options.length === 2 && options.every(option => option.length < 10);
  
  return (
    <Box variant="relative" textAlign="center">
      <QuestionText text={text} recipientName={recipient.name} />

      <Box variant="relative">
        {disabled &&
          <Box variant="whiteOverlay" />
        }

        {!isRecipient &&
          <Text mb={3} variant="subtitle">
            Guess {recipient.name}'s answer
          </Text>
        }

        {multiline ? (
          <Flex mt={2} mx={-2}>
            <Box width={1 / 2} px={2}>
              <Button variant={getVariant(0)} width={1} onClick={() => handleClick(0)}>
                {options[0]}
              </Button>
            </Box>
            <Box width={1 / 2} px={2}>
              <Button variant={getVariant(1)} width={1} onClick={() => handleClick(1)}>
                {options[1]}
              </Button>
            </Box>
          </Flex>
        ) : 
          options.map((option, index) => (
            <Box key={index}>
              <Button variant={getVariant(index)} width={1} my={1} onClick={() => handleClick(index)}>
                {option}
              </Button>
            </Box>
          ))
        }

        {isRecipient &&
          <Text mt={3} variant="subtitle">
            Answer honestly and let the other players guess your answer
          </Text>
        }
      </Box>
    </Box>
  );
};

export default CurrentQuestion;
