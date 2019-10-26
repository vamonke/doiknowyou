import React from "react";
import { connect } from "react-redux";
import { joinRoom } from "../redux/client";
import { useHistory } from "react-router-dom";

import { JoinGame } from "../organisms";

const Join = ({ room, viewer }) => {  
  joinRoom(viewer);
  
  const history = useHistory();
  if (!viewer._id || !room._id) {
    return <JoinGame lobby />;
  } else {
    history.push(`/lobby/${room.number}`);
  }
  return null;
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Join);
