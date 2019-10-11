import React from "react";
import { Card, Box, Flex, Heading } from "rebass";

const PlayerList = ({ players, viewer }) => {
  return (
    <Card mt={3}>
      <Heading fontSize={3} m={-3} mb={0} variant="black">
        Players
      </Heading>
      <Box width={1}>
        {players.map((player, index) => {
          const isViewer = player._id === viewer._id;
          return (
            <Flex key={index} variant="row">
              <Box width={3 / 4}>
                {player.name}
                {isViewer && " (you)"}
              </Box>
              <Box width={1 / 4} textAlign="right">
                {player.isReady ? "Ready" : "Not Ready"}
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Card>
  );
};

export default PlayerList;