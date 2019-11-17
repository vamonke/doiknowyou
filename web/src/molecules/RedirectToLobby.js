import React from "react";
import { connect } from "react-redux";

import history from "../redux/history";

const RedirectToLobby = props => {
  const { room, viewer, players } = props;
  const { _id: viewerId } = viewer;

  if (
    viewer._id &&
    room._id &&
    players.length > 0 &&
    players.find(player => player._id === viewerId)
  ) {
    console.log("Redirecting to lobby");
    setTimeout(() => history.push(`/lobby/${room.number}`));
  }

  return <div className="loader-small" />;
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(RedirectToLobby);
