import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Heading, Box, Button } from "rebass";
import { leave } from "../redux/actions";

const Disconnected = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);
  console.log(loading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? null : (
    <Box textAlign="center">
      <Heading fontSize={4}>Disconnected</Heading>
      <Button
        variant="primary"
        mt={3}
        onClick={() => dispatch(leave())}
        width={1}
      >
        Join back into game
      </Button>
    </Box>
  );
};

export default connect()(Disconnected);