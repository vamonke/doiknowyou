import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Flex, Heading, Button } from "rebass";
import { joinRoom, playerReady, playerNotReady } from "../redux/client";

import { QuestionsForm, JoinGame, Settings } from "../organisms";
import { LobbyPlayerList, Disconnected, Countdown } from "../molecules";

const Lobby = props => {
  const { room, viewer, players, questions, questionBank, dispatch } = props;
  const { _id: roomId, number: roomNo, host: hostId, status } = room;
  const { _id: viewerId, isReady: viewerIsReady } = viewer;
  const isHost = hostId === viewerId;

  useEffect(() => {
    console.log("useEffect: Joining game");
    joinRoom(viewer);
  }, [viewerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // window.onbeforeunload = () => {
  //   return 'Exit game?';
  // };

  const [showSettings, setShowSettings] = useState(false);

  if (!viewerId || !roomId) {
    return <JoinGame lobby />;
  }

  if (players.length > 0 && !players.find(player => player._id === viewerId)) {
    // Viewer not in player list
    return <Disconnected />;
  }

  document.title = `Do I know you? #${roomNo}`;

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
            Room {roomNo}
            {isHost && (
              <Button
                type="button"
                fontSize={2}
                p={0}
                onClick={() => setShowSettings(true)}
              >
                Settings
              </Button>
            )}
          </Flex>
        </Heading>

        {status === "started" && viewerIsReady ? (
          <Countdown roomNo={roomNo} />
        ) : (
          <QuestionsForm
            isReady={viewerIsReady}
            onReady={onReady}
            onNotReady={onNotReady}
            questionBank={questionBank}
            questions={questions}
          />
        )}
      </Card>

      {players.length > 0 && (
        <LobbyPlayerList
          players={players}
          viewerId={viewerId}
          hostId={hostId}
          dispatch={dispatch}
        />
      )}

      {isHost && showSettings && (
        <Settings
          room={room}
          hide={() => setShowSettings(false)}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Lobby);
