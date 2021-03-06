import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "rebass";

const PlayerWaiting = ({ question, recipientName }) => {
  const { isClosed, options } = question;
  const waitingMsg = `Waiting for ${
    isClosed ? `${recipientName} to choose` : "other players"
  }`;
  return (
    <>
      <Text variant="subtitle">{waitingMsg}</Text>
      {options && options.length > 0 && (
        <Box mt={3}>
          {options.map((option, i) => (
            <Text variant="tag" key={i}>
              {option}
            </Text>
          ))}
        </Box>
      )}
    </>
  );
};

PlayerWaiting.propTypes = {
  question: PropTypes.shape({
    isClosed: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired,
  recipientName: PropTypes.string.isRequired
};

export default PlayerWaiting;
