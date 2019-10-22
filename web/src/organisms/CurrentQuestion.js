import React from "react";
import { connect } from "react-redux";
import { Flex, Box, Button, Text } from "rebass";
// import { Input } from "@rebass/forms";
// import { withFormik } from "formik";

const CreateGame = props => {
  const {
    currentQuestion,
    recipient,
    isRecipient,
    answer,
    handleClick
  } = props;

  const {
    text,
    options,
    // type,
  } = currentQuestion;

  const disabled = currentQuestion.status !== "asking";
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

// const formOptions = {
//   mapPropsToValues: props => props,
//   validate,
//   validateOnBlur: false,
//   validateOnChange: false,
//   handleSubmit: async (values, { setSubmitting }) => {
//     const { createGame, name, history } = values;
//     const roomNo = await createGame(name);
//     setSubmitting(false);
//     history.push("/lobby/" + roomNo);
//   },
//   displayName: "CreateGame"
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     createGame: name => dispatch(createGame(name))
//   };
// };

export default connect(
  null,
  null
)(CreateGame);
