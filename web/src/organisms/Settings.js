import React from "react";
import PropTypes from "prop-types";
import { Flex, Heading, Button, Text } from "rebass";

import { hostSettings } from "../redux/client";

const durations = [0, 15, 30, 60];

const QuestionResults = ({ room, hide, dispatch }) => {
  const { timeLimit = 0 } = room;
  const onClick = timeLimit => {
    const settings = { timeLimit };
    dispatch(hostSettings(settings));
  };
  const onHide = hide;
  return (
    <>
      <Heading variant="black">Game Settings</Heading>

      <Text fontWeight="medium" mb={3}>
        Question time limit
      </Text>

      <Flex sx={{ borderRight: "1px solid black" }}>
        {durations.map((duration, index) => (
          <Button
            key={index}
            variant={timeLimit === duration ? "primary" : "secondary"}
            onClick={() => onClick(duration)}
            flexGrow={1}
            sx={{ borderRight: "none" }}
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

      <Button onClick={onHide} width={1} mt={3}>
        Done
      </Button>
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
