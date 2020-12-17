import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Box, Button, Text } from "rebass";
import { leave } from "../redux/actions";

const Disconnected = ({ dispatch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? null : (
    <Box textAlign="center">
      <Box variant="gradient">
        <Box variant="card.top.large" py={[3, 3, 24, 24]} mt={[2, 2, 3, 4]}>
          <Text fontWeight="medium" fontSize={4} px={2} pt={[1, 1, 0]}>
            Disconnected
          </Text>
        </Box>
      </Box>

      <Box px={[0, 2, 3]}>
        <Box variant="card.bottom" pt={[3]}>
          <Button variant="primary" onClick={() => dispatch(leave())} width={1}>
            Join back into game
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Disconnected.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Disconnected);
