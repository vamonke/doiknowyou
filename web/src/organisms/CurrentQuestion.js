import React from "react";
import { Flex, Box, Button, Text } from "rebass";

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

  return (
    <Box variant="relative" textAlign="center">

      <Box fontSize={4} mb={3} mx={-3} p={4} pt={2} sx={{ borderBottom: "1px solid black" }}>
        <Text mb={3}>
          {text}
        </Text>
        <Text>
          {recipient.name}: <Box variant="line"></Box>
        </Text>
      </Box>

      <Box variant="relative">
        {disabled &&
          <Box variant="whiteOverlay" />
        }

        {!isRecipient &&
          <Text mb={3} variant="subtitle">
            Guess {recipient.name}'s answer
          </Text>
        }

        {options.length === 2 ? (
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
