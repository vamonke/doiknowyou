import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "rebass";

// Waiting for other players or game to start
const Waiting = ({ edit }) => (
  <Box variant="container">
    <Box variant="card.top.xsmall">Ready</Box>

    <Box variant="card.bottom.xsmall">
      <Box textAlign="center">
        <Box py={3}>Waiting for other players</Box>
        <Button variant="secondary" width={[1, "auto"]} onClick={edit}>
          Edit questions
        </Button>
      </Box>
    </Box>
  </Box>
);
Waiting.propTypes = {
  edit: PropTypes.func.isRequired
};

export default Waiting;
