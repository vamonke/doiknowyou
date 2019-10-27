import React from "react";
import PropTypes from "prop-types";
import { Card, Box, Flex, Heading, Text } from "rebass";

const GamePlayerList = ({ players, viewer, recipientId }) => {
  return (
    <Card>
      <Heading variant="blackSmall" mb={0}>
        Players
      </Heading>
      <Box width={1} mb={-3}>
        {players.map((player, index) => {
          const { _id, score, name, hasAnswered } = player;
          const isViewer = _id === viewer._id;
          const isRecipient = _id === recipientId;
          return (
            <Flex key={index} variant="row">
              <Box width={1 / 12}>
                {score || "0"}
              </Box>
              <Box width={8 / 12}>
                <Text display="inline" variant={isViewer ? "bold" : ""}>
                  {name}
                </Text>
                {isViewer && " (you)"}
                {isRecipient && " (answering)"}
              </Box>
              <Box width={3 / 12} textAlign="right">
                {hasAnswered && "Done"}
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Card>
  );
};

GamePlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hasAnswered: PropTypes.bool,
    })
  ),
  viewer: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  recipientId: PropTypes.string.isRequired
};

export default GamePlayerList;