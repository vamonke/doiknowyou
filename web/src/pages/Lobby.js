import React from "react";
import { connect } from "react-redux";
import { Card, Heading, Box, Button, Link } from "rebass";
import { joinRoom, playerReady, playerNotReady } from "../redux/client";

import { reset } from "../redux/actions";

import QuestionsForm from "../organisms/QuestionsForm";
import LobbyPlayerList from "../molecules/LobbyPlayerList";
import JoinGame from "../organisms/JoinGame";
import Countdown from "../molecules/Countdown";

const Lobby = (props) => {
  const {
    room,
    viewer,
    players,
    questions,
    questionBank,
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

  const onReady = questions => {
    dispatch(playerReady(questions));
  };

  const onNotReady = () => {
    dispatch(playerNotReady());
  };

  return (
    <>
      <Card>
        <Heading fontSize={3} m={-3} mb={0} variant="black">
          Room {room.number}
        </Heading>
        {room.status === "started" && viewer.isReady ?
          <Countdown roomNo={room.number} />
          :
          <QuestionsForm
            isReady={viewer.isReady}
            onReady={onReady}
            onNotReady={onNotReady}
            questionBank={questionBank}
            questions={questions}
          />
        }
      </Card>

      {players.length > 0 && <LobbyPlayerList players={players} viewer={viewer} />}
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Lobby);
