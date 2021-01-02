import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Flex, Box, Text } from "rebass";
import { joinAsProjector } from "../redux/actions";
import QRCode from "qrcode.react";

const Lobby = props => {
  const { room, players, joinAsProjector } = props;
  // const { hostId, status, timeLimit, gameMode } = room;
  const roomNo = room.number || props.match.params.roomNo;

  useEffect(() => {
    joinAsProjector(roomNo);
  }, [roomNo, joinAsProjector]);

  const inviteLink = document.location.href.replace("/project", "");

  // if (!roomNo) {
  //   return <JoinGameCard />;
  // }

  document.title = `Do I know you? #${roomNo}`;

  return (
    <Box>
      <Box variant="gradient" pt={4} pb={96} mb={-60} color="white">
        <Flex
          variant="container"
          maxWidth={1440}
          justifyContent="space-between"
        >
          <Box>
            <Text px={4}>
              <Text fontWeight="bold" pt={2} pb={128} fontSize={5}>
                Do I Know You{" "}
                <Text color="yellow" sx={{ display: "inline" }}>
                  ?
                </Text>
              </Text>
              <Text fontSize={8}>
                Go to{" "}
                <Text as="span" fontWeight="bold">
                  doiknowyou.io
                </Text>{" "}
                and join game{" "}
                <Text as="span" fontWeight="bold">
                  {roomNo}
                </Text>
              </Text>
              <Text pt={3} fontSize={7}>
                Or open your phone camera and scan the QR code
              </Text>
            </Text>
          </Box>
          <Box>
            <Flex
              justifyContent="flex-end"
              alignItems="center"
              sx={{ borderLeft: "0px solid white" }}
              px={3}
            >
              <Box
                variant="card"
                sx={{ border: "none" }}
                height={400}
                width={400}
                p={24}
              >
                <QRCode
                  value={inviteLink}
                  style={{ width: "100%", height: "auto" }}
                  fgColor="#2C2736"
                  size={1024}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex variant="container" maxWidth={1440}>
        <Box width={1 / 2} px={3}>
          <Box>
            <Box variant="card.top.small">How to play</Box>
            <Box variant="card.bottom.small" fontSize={3}>
              <Text variant="p" mt={0}>
                One person sits in the "the hot seat" each round and has to
                answer a question about themself.
              </Text>
              <Text variant="p">
                Meanwhile, the other players have to try to guess the answer of
                the player in the hot seat.
              </Text>
              <Text variant="p">
                Whoever guesses correctly wins 1 point. The player with the
                highest points wins the game.
              </Text>
            </Box>
          </Box>
        </Box>
        <Box width={1 / 2} px={3}>
          <Box variant="card.top.small">Players ({players.length})</Box>
          <Box variant="card.bottom.small">
            {players.map(player => {
              return (
                <Text key={player._id} variant="tag.large">
                  {player.name}
                </Text>
              );
            })}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

const mapDispatchToProps = dispatch => ({
  joinAsProjector: roomNo => dispatch(joinAsProjector(roomNo))
});

// TODO: Use mapToDispatch
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
