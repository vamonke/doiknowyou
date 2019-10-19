import React from "react";
import { connect } from "react-redux";
import { Card, Heading, Box, Button, Link } from "rebass";

import { reset } from "../redux/actions";
import { joinRoom, playerAnswer } from "../redux/client";

import GamePlayerList from "../organisms/GamePlayerList";
import JoinGame from "../organisms/JoinGame";
import CurrentQuestion from "../organisms/CurrentQuestion";

const Game = (props) => {
  const {
    room,
    answer,
    currentQuestion,
    // questionList,
    recipient,
    viewer,
    players,
    dispatch
  } = props;
  
  if (!viewer._id || !room._id) {
    return <JoinGame lobby />;
  }

  joinRoom(viewer);
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

  const handleClick = index => {
    dispatch(playerAnswer(index));
  }

  return (
    <>
      <Card>
        <Heading fontSize={2} m={-3} mb={3} variant="black-small" textAlign="">
          Round {currentQuestion.round}
        </Heading>

        <CurrentQuestion
          currentQuestion={currentQuestion}
          recipient={recipient}
          isRecipient={recipient._id === viewer._id}
          handleClick={handleClick}
          answer={answer}
        />

      </Card>

      {players.length > 0 && <GamePlayerList players={players} viewer={viewer} recipientId={recipient._id} />}
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const recipient = state.players[state.currentQuestion.recipientId] || {};
  const viewer = {
    ...state.viewer,
    ...state.players[state.viewer._id],
  };
  return { ...state, players, viewer, recipient };
};

export default connect(mapStateToProps)(Game);
