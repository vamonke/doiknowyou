import React, { useState } from "react";
import { connect } from "react-redux";
import { Flex, Box, Text, Heading } from "rebass";

import { JoinGameCard, GameInfo } from "../organisms";
import { LobbyPlayerList, Countdown } from "../molecules";
import QRCode from "qrcode.react";

const Lobby = props => {
  const { room, players } = props;
  const { number: roomNo, hostId, status, timeLimit, gameMode } = room;

  const inviteLink = document.location.href;

  if (!roomNo) {
    return <JoinGameCard />;
  }

  document.title = `Do I know you? #${roomNo}`;

  return (
    <Flex variant="gradient">
      <Box
        width={1 / 2}
        sx={{ bg: "darkpurple", height: "100vh" }}
        color="white"
      >
        <Box variant="container" pt={6} px={[5, 5]}>
          <Heading fontSize={8} lineHeight="1em">
            Do I Know You
            <Text color="darkyellow" ml={2} sx={{ display: "inline" }}>
              ?
            </Text>
          </Heading>
          {/* <Text mt={3}>
            A game to test how well you really know your friends
          </Text> */}
          <Text lineHeight={["1.6em", "1.8em"]} pt={3}>
            <Heading fontSize={3} fontWeight="body" color="darkyellow">
              How to play
            </Heading>
            <Text variant="p">
              One person sits in the "the hot seat" each round and has to answer
              a question about themself.
            </Text>
            <Text variant="p">
              Meanwhile, the other players have to try to guess the answer of
              the player in the hot seat.
            </Text>
            <Text variant="p">
              Whoever guesses correctly wins 1 point. The player with the
              highest points wins the game.
            </Text>
          </Text>
          <Heading
            fontSize={3}
            fontWeight="body"
            color="darkyellow"
            mt={4}
            mb={3}
          >
            Players
          </Heading>
          {players.map(player => {
            return <Text variant="tag">{player.name}</Text>;
          })}
        </Box>
      </Box>

      <Box width={1 / 2} textAlign="center" color="white">
        <Box py={48} />
        {/* {status === "created" && (
          <GameInfo
            roomNo={roomNo}
            gameMode={gameMode}
            playerCount={players.length}
            timeLimit={timeLimit}
          />
        )} */}

        <Text>Scan this QR code to join game.</Text>

        <Flex justifyContent="center" py={3}>
          <Box p={40} variant="card" sx={{ border: "none" }}>
            <QRCode
              value={inviteLink}
              style={{ maxWidth: "100%", height: "auto", width: 400 }}
              fgColor="#2C2736"
              size={1024}
            />
          </Box>
        </Flex>

        <Text pb={3}>Or go to {inviteLink}</Text>
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

// TODO: Use mapToDispatch
export default connect(mapStateToProps)(Lobby);
