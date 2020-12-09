import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "rebass";
import Icon from "react-eva-icons";

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
            const isDraw =
              players[0] && players[1] && players[0].score === players[1].score;
            const isWinner = !isDraw && score === players[0].score;
            // const isRecipient = _id === recipientId;
            return (
              <Flex key={index} justifyContent="space-between" variant="row">
                <Box>
                  <Flex alignItems="center">
                    <Text fontWeight={isViewer ? "medium" : "body"}>
                      {name}
                    </Text>
                    {isWinner && (
                      <Box mb={-1} ml={1} key="award-outline">
                        <Icon
                          fill="#F7B500"
                          name="award-outline"
                          size="large"
                        />
                      </Box>
                    )}
                    {isWinner && <Box color="orange">Winner</Box>}
                  </Flex>
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
