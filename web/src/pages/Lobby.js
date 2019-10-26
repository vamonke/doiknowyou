import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Heading } from "rebass";
import { joinRoom, playerReady, playerNotReady } from "../redux/client";

import { QuestionsForm, JoinGame } from "../organisms";
import { LobbyPlayerList, Disconnected, Countdown } from "../molecules";

const Lobby = (props) => {
  const {
    room,
    viewer,
    players,
    questions,
    questionBank,
    dispatch
  } = props;
  
  useEffect(() => {
    console.log("useEffect: Joining game");
    joinRoom(viewer);
  }, [viewer._id]); // eslint-disable-line react-hooks/exhaustive-deps

  document.title = `Do I know you? #${room.number}`;

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
