import React from "react";
import { connect } from "react-redux";
import { Card, Heading, Box, Button, Link } from "rebass";

import { reset } from "../redux/actions";

import PlayerList from "../organisms/PlayerList";
import JoinGame from "../organisms/JoinGame";

const Game = (props) => {
  const {
    room,
    viewer,
    players,
    dispatch
  } = props;
  
  if (!viewer._id || !room._id) {
    return <JoinGame lobby />;
  }

  document.title = `Do I know you? #${room.number}`;

  if (
    players.length > 0 &&
    !players.find(player => player._id === viewer._id)
  ) {
    return (
      <Box textAlign="center">
        <Heading fontSize={4}>Disconnected</Heading>
        <Button
          variant="primary"
          my={3}
          onClick={() => dispatch(reset())}
          width={1}
        >
          Join back into game
        </Button>
        <Link variant="secondary" href="/">
          Home
        </Link>
      </Box>
    );
  }

  return (
    <>
      <Card>
        <Heading fontSize={4} m={-3} mb={3} variant="black">
          Game
        </Heading>

        QUESTION GOES HERE

      </Card>

      {players.length > 0 && <PlayerList players={players} viewer={viewer} />}
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Game);
