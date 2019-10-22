import React from "react";
import { connect } from "react-redux";

import { Heading, Box, Button, Link } from "rebass";
import { reset } from "../redux/actions";

const Disconnected = ({ dispatch }) => {
  return (
    <Box textAlign="center">
      <Heading fontSize={4}>Disconnected</Heading>
      <Button
        variant="primary"
        my={3}
        onClick={() => dispatch(reset())}
        width={1}
      >
        Join back into game
      </Button>
      <Link variant="secondary" href="/">
        Home
      </Link>
    </Box>
  );
};

export default connect()(Disconnected);