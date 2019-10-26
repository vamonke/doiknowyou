import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Flex, Heading, Button } from "rebass";
import { joinRoom, playerReady, playerNotReady } from "../redux/client";

import { QuestionsForm, JoinGame, Settings } from "../organisms";
import { LobbyPlayerList, Disconnected, Countdown } from "../molecules";

const Lobby = props => {
  const { room, viewer, players, questions, questionBank, dispatch } = props;

  useEffect(() => {
    console.log("useEffect: Joining game");
    joinRoom(viewer);
  }, [viewer._id]); // eslint-disable-line react-hooks/exhaustive-deps

  document.title = `Do I know you? #${room.number}`;

  // window.onbeforeunload = () => {
  //   return 'Exit game?';
  // };

  const [showSettings, setShowSettings] = useState(true);

  if (!viewer._id || !room._id) {
    return <JoinGame lobby />;
  }

  if (
    players.length > 0 &&
    !players.find(player => player._id === viewer._id)
  ) {
    return <Disconnected />;
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
        <Heading variant="black">
          <Flex justifyContent="space-between">
            Room {room.number}
            <Button
              type="button"
              fontSize={2}
              p={0}
              onClick={() => setShowSettings(true)}
            >
              Settings
            </Button>
          </Flex>
        </Heading>

        {room.status === "started" && viewer.isReady ? (
          <Countdown roomNo={room.number} />
        ) : (
          <QuestionsForm
            isReady={viewer.isReady}
            onReady={onReady}
            onNotReady={onNotReady}
            questionBank={questionBank}
            questions={questions}
          />
        )}
      </Card>

      {players.length > 0 && (
        <LobbyPlayerList players={players} viewerId={viewer._id} hostId={room.host} />
      )}

      {showSettings &&
        <Settings room={room} hide={() => setShowSettings(false)} />
      }
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Lobby);
