import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "rebass";

// TODO: Use new GameResults component when game is over
const GamePlayerList = ({ players, viewer, recipientId, gameOver = false }) => (
  <>
    <Box
      variant={gameOver ? "orange" : ""}
      pt={gameOver ? [3, 24] : 0}
      px={[0, 0]}
    >
      <Box variant="container">
        <Box variant="card.top.xsmall">Scoreboard</Box>
      </Box>
    </Box>
    <Box variant="container">
      <Box variant="card.bottom.xsmall" pb={2}>
        <Box>
          {players.map((player, index) => {
            const { _id, score, name, hasAnswered } = player;
            const isViewer = _id === viewer._id;
            // const isRecipient = _id === recipientId;
            return (
              <Flex key={index} justifyContent="space-between" variant="row">
                <Box>
                  <Text display="inline" variant={isViewer ? "bold" : ""}>
                    {name}
                  </Text>
                  {/* {isViewer && " (you)"} */}
                  {/* {isRecipient && " (answering)"} */}
                  {/* {isRecipient && <Text variant="tag.small">Answering</Text>} */}
                  {hasAnswered && (
                    <Text variant="tag.small" bg="blue">
                      Done
                    </Text>
                  )}
                </Box>
                {/* <Box width={3 / 12} textAlign="right">
                  {hasAnswered && "Done"}
                </Box> */}
                <Box color="orange" fontWeight="medium">
                  {score || "0"}
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Box>
    </Box>
  </>
);

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
