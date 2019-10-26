import React from "react";
import { Card, Box, Flex, Heading, Text } from "rebass";

const LobbyPlayerList = ({ players, viewerId, hostId }) => 
  <Card mt={3}>
    <Heading variant="black">
      Players
    </Heading>
    <Box width={1} mb={-3}>
      {players.map((player, index) => {
        const isViewer = player._id === viewerId;
        const isHost = player._id === hostId;
        return (
          <Flex key={index} variant="row">
            <Box width={3 / 4}>
              <Text variant={isViewer ? "bold" : ""} display="inline">
                {player.name}
              </Text>
              {/* {isViewer && " (you)"*} */}
              {isHost && 
                <Text variant="tag.small">
                  Host
                </Text>
              }
            </Box>
            <Box width={1 / 4} textAlign="right">
              {player.isReady ? "Ready" : "Not Ready"}
            </Box>
          </Flex>
        );
      })}
    </Box>
  </Card>
;

export default LobbyPlayerList;