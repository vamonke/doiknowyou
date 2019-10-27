import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { joinRoom } from "../redux/client";

import history from "../redux/history";
import { JoinGame } from "../organisms";

const Join = ({ room, viewer }) => {  
  joinRoom(viewer);
  
  if (!viewer._id || !room._id) {
    return <JoinGame lobby />;
  } else {
    history.push(`/lobby/${room.number}`);
  }
  return null;
};

Join.propTypes = {
  room: {
    _id: PropTypes.string,
    number: PropTypes.number,
  },
  viewer: {
    _id: PropTypes.string
  },
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};


export default connect(mapStateToProps)(Join);
