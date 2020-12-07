import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "rebass";

const GamePlayerList = ({ players, viewer, recipientId, gameOver = false }) => {
  return (
    <Box variant="container">
      <Box variant={gameOver ? "orange" : ""}>
        <Box variant="card.top.xsmall">Players</Box>
      </Box>

      <Box variant="card.bottom.xsmall">
        <Box>
          {players.map((player, index) => {
            const { _id, score, name, hasAnswered } = player;
            const isViewer = _id === viewer._id;
            const isRecipient = _id === recipientId;
            return (
              <Flex key={index} variant="row">
                <Box width={1 / 12}>{score || "0"}</Box>
                <Box width={8 / 12}>
                  <Text display="inline" variant={isViewer ? "bold" : ""}>
                    {name}
                  </Text>
                  {/* {isViewer && " (you)"} */}
                  {/* {isRecipient && " (answering)"} */}
                  {isRecipient && <Text variant="tag.small">Answering</Text>}
                </Box>
                <Box width={3 / 12} textAlign="right">
                  {hasAnswered && "Done"}
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

GamePlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hasAnswered: PropTypes.bool
    })
  ),
  viewer: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  recipientId: PropTypes.string
};

export default GamePlayerList;
