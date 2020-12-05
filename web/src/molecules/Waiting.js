import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "rebass";

// Waiting for other players or game to start
const Waiting = ({ edit }) => (
  <Box>
    <Box px={[2, 2, 3]}>
      <Box variant="orange.card.small">Ready</Box>
    </Box>
    <Box px={[0, 2, 3]}>
      <Box variant="card.bottom">
        <Box pt={[3, 2]} pb={[0, 2, 3]} textAlign="center">
          <Box pb={3}>Waiting for other players</Box>
          <Button variant="secondary" width={[1, "auto"]} onClick={edit}>
            Edit questions
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);
Waiting.propTypes = {
  edit: PropTypes.func.isRequired
};

export default Waiting;
