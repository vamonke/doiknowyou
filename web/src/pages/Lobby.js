import React from "react";
import { connect } from "react-redux";
import { Card, Box, Flex, Heading, Button, Text } from "rebass";
import { joinRoom, playerReady, playerNotReady } from "../redux/socket";

import QuestionsForm from "../organisms/QuestionsForm";

const Lobby = ({ room, viewer, players, dispatch }) => {
  joinRoom(viewer);

  const onReady = () => {
    console.log("onReady");
    dispatch(playerReady());
  };

  const onNotReady = () => {
    console.log("onNotReady");
    dispatch(playerNotReady());
  };

  return (
    <>
      <Card align="center">
        <Heading fontSize={4} m={-3} mb={0} variant="black">
          Room {room.number}
        </Heading>
        <QuestionsForm onReady={onReady} onNotReady={onNotReady} />
      </Card>

      <Card mt={3}>
        <Heading fontSize={3} m={-3} mb={0} variant="black">
          Players
        </Heading>
        <Box width={1}>
          {players.map((player, index) => {
            const isViewer = player._id === viewer._id;
            return (
              <Flex key={index} variant="row">
                <Box width={3 / 4} fontWeight={isViewer ? "600" : "400"}>
                  {player.name}
                </Box>
                <Box width={1 / 4} textAlign="right">
                  {player.isReady ? "Ready" : "Not Ready"}
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Card>
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  return { ...state, players };
};

export default connect(mapStateToProps)(Lobby);
