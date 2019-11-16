import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Button, Text } from "rebass";

import { hostSettings } from "../redux/client";

const durations = [0, 10, 20, 30];
const borderRadius = ["21px 0 0 21px", 0, 0, "0 21px 21px 0"];

const QuestionResults = ({ room, hide, dispatch }) => {
  const { timeLimit = 0 } = room;
  const onClick = timeLimit => {
    const settings = { timeLimit };
    dispatch(hostSettings(settings));
  };
  const onHide = hide;
  return (
    <>
      <Box variant="orange.card.small">
        <Box variant="modal.header">Game Settings</Box>
      </Box>

      <Box variant="modal.card">
        <Text fontWeight="medium" mb={3} mt={0}>
          Question time limit
        </Text>

        <Flex>
          {durations.map((duration, index) => (
            <Button
              key={index}
              variant={timeLimit === duration ? "black" : "secondary"}
              onClick={() => onClick(duration)}
              sx={{ borderRadius: borderRadius[index] }}
              flexGrow={1}
            >
              {duration === 0 ? "No limit" : duration + "s"}
            </Button>
          ))}
        </Flex>

        {timeLimit !== 0 && (
          <Text textAlign="center" mt={3}>
            Excludes open-ended questions
          </Text>
        )}

        <Button onClick={onHide} width={1} mt={24}>
          Done
        </Button>
      </Box>
    </>
  );
};

QuestionResults.propTypes = {
  isOpen: PropTypes.bool,
  room: PropTypes.shape({
    timeLimit: PropTypes.number
  }),
  hide: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default QuestionResults;
