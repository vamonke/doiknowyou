import React, { useState } from "react";
import { connect } from "react-redux";
import { Flex } from "rebass";

import { playerReady, playerNotReady } from "../redux/client";
import * as analytics from "../analytics";

import { QuestionsForm, Settings, JoinGameCard, GameInfo } from "../organisms";
import { LobbyPlayerList, Countdown } from "../molecules";
import { Modal, HomeLink } from "../atoms";

const Lobby = props => {
  const { room, viewer, players, questions, questionBank, dispatch } = props;
  const { number: roomNo, hostId, status, timeLimit, gameMode } = room;
  const { _id: viewerId, isReady: viewerIsReady, name: viewerName } = viewer;
  const isHost = hostId === viewerId || viewerName === "Varick"; // ;)

  analytics.setUserId(viewerId);

  const [showSettings, setShowSettings] = useState(false);

  if (!viewerId || !roomNo) {
    return <JoinGameCard />;
  }

  // if (players.length > 0 && !players.find(player => player._id === viewerId)) {
  //   // Viewer not in player list
  //   return <Disconnected />;
  // }

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
        variant="gradient"
        justifyContent="center"
        fontWeight="medium"
        color="white"
        fontSize={1}
        py={3}
      >
        Do I Know You?
      </Flex>

      {status === "created" && (
        <GameInfo
          roomNo={roomNo}
          gameMode={gameMode}
          playerCount={players.length}
          timeLimit={timeLimit}
          isHost={isHost}
          showSettings={() => setShowSettings(true)}
        />
      )}

      {gameMode === "custom" && status === "created" && (
        <QuestionsForm
          isReady={viewerIsReady}
          onReady={onReady}
          onNotReady={onNotReady}
          questionBank={questionBank}
          questions={questions}
        />
      )}

      {status === "started" && <Countdown roomNo={roomNo} />}

      {players.length > 0 && (
        <LobbyPlayerList
          players={players}
          viewerId={viewerId}
          viewerIsHost={isHost}
          hostId={hostId}
          roomNo={roomNo}
          gameMode={gameMode}
          dispatch={dispatch}
          showInvite={true}
        />
      )}

      {isHost && (
        <Modal isOpen={showSettings} hide={() => setShowSettings(false)}>
          <Settings room={room} hide={() => setShowSettings(false)} />
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

// TODO: Use mapToDispatch
export default connect(mapStateToProps)(Lobby);
