import React from "react";
import { Box, Text, Button } from "rebass";

// Waiting for other players or game to start
const Waiting = ({ edit }) => {
  return (
    <Box py={5} textAlign="center">
      <Text mb={3}>Waiting for other players</Text>
      <Button variant="secondary" onClick={edit}>
        Edit questions
      </Button>
    </Box>
  );
};

export default Waiting;
