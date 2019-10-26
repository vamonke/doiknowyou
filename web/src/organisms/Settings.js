import React from "react";
import { Flex, Box, Card, Heading, Button, Text } from "rebass";

import { hostSettings } from "../redux/client";

const durations = [0, 15, 30, 60];

const QuestionResults = ({ room, hide, dispatch }) => {
  const { timeLimit = 0 } = room;
  const onClick = timeLimit => {
    const settings = { timeLimit };
    dispatch(hostSettings(settings));
  };
  return (
    <Card variant="modal">
      <Box variant="modalBody">
        <Heading variant="black">
            Game Settings
        </Heading>

        <Text fontWeight="medium" mb={2}>
          Question time limit
        </Text>

        <Flex sx={{ borderRight: "1px solid black" }}>
          {durations.map((duration, index) =>   
            <Button
              key={index}
              variant={timeLimit === duration ? "primary" : "secondary"}
              onClick={() => onClick(duration)}
              flexGrow={1}
              sx={{ borderRight: "none" }}
            >
              {duration === 0 ? "No limit" : (duration + "s")}
            </Button>
          )}
        </Flex>

        <Button onClick={hide} width={1} mt={3}>
          Done
        </Button>
      </Box>
    </Card>
  );
};

export default QuestionResults;
