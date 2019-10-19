import React from "react";
import { Card, Box, Flex, Heading, Text } from "rebass";

const GamePlayerList = ({ players, viewer, recipientId }) => {
  return (
    <Card mt={3}>
      <Heading fontSize={2} m={-3} mb={0} variant="black-small">
        Players
      </Heading>
      <Box width={1}>
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

export default GamePlayerList;