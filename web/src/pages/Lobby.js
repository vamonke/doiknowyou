import React from "react";
import { connect } from "react-redux";
import { Card, Heading } from "rebass";
import { joinRoom, playerReady, playerNotReady } from "../redux/socket";
// import { fetchQuestionBank } from "../redux/actions";

import QuestionsForm from "../organisms/QuestionsForm";
import PlayerList from "../organisms/PlayerList";

const Lobby = ({ room, viewer, players, questionBank, dispatch }) => {
  joinRoom(viewer);
  document.title = `Do I know you? #${room.number}`;

  const onReady = questions => {
    dispatch(playerReady(questions));
  };

  const onNotReady = () => {
    dispatch(playerNotReady());
  };

  return (
    <>
      <Card align="center">
        <Heading fontSize={4} m={-3} mb={0} variant="black">
          Room {room.number}
        </Heading>
        <QuestionsForm
          onReady={onReady}
          onNotReady={onNotReady}
          questionBank={questionBank}
        />
      </Card>

      <PlayerList players={players} viewer={viewer} />
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  return { ...state, players };
};

export default connect(mapStateToProps)(Lobby);
