import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Flex, Button, Text } from "rebass";
import Icon from "react-eva-icons";

import { joinRoom, playerReady, playerNotReady } from "../redux/client";

import { QuestionsForm, JoinGameCard, Settings } from "../organisms";
import { LobbyPlayerList, Disconnected, Countdown } from "../molecules";
import { Modal, HomeLink } from "../atoms";

const Lobby = props => {
  const { room, viewer, players, questions, questionBank, dispatch } = props;
  const { _id: roomId, number: roomNo, hostId, status } = room;
  const { _id: viewerId, isReady: viewerIsReady, name: viewerName } = viewer;
  const isHost = hostId === viewerId || viewerName === "Varick";

  useEffect(() => {
    console.log("useEffect: Joining game");
    joinRoom(viewer);
  }, [viewerId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showSettings, setShowSettings] = useState(false);

  if (!viewerId || !roomId) {
    return <JoinGameCard />;
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
      <Flex
        variant="orange"
        justifyContent="center"
        alignItems="center"
        px={[3, 3, 3]}
        pb={1}
        mb={-1}
      >
        <Text fontWeight="medium" color="white" fontSize={3}>
          Room {roomNo}
        </Text>
        {isHost && (
          <Button
            ml={3}
            variant="settings"
            fontSize={2}
            textDecoration="underline"
            onClick={() => setShowSettings(true)}
          >
            <Icon
              fill="#F7CF00"
              name="settings-2-outline"
              size="large" // small, medium, large, xlarge
            />
            <Text as="span" ml={2} pb={1}>
              Settings
            </Text>
          </Button>
        )}
      </Flex>

      {status !== "created" && viewerIsReady ? (
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

      {players.length > 0 && (
        <LobbyPlayerList
          players={players}
          viewerId={viewerId}
          viewerIsHost={isHost}
          hostId={hostId}
          dispatch={dispatch}
        />
      )}

      {isHost && (
        <Modal isOpen={showSettings} hide={() => setShowSettings(false)}>
          <Settings
            room={room}
            dispatch={dispatch}
            hide={() => setShowSettings(false)}
          />
        </Modal>
      )}

      <HomeLink />
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Lobby);
