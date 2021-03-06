import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../redux/history";

const RedirectToLobby = props => {
  const { room, viewer, players } = props;

  useEffect(() => {
    const canEnter =
      viewer._id &&
      room._id &&
      players.length > 0 &&
      players.some(player => player._id === viewer._id);

    if (canEnter) {
      console.log("Redirecting to lobby");
      history.push(`/lobby/${room.number}`);
    }
  }, [viewer, room, players]);

  return <div className="loader-small" />;
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(RedirectToLobby);
