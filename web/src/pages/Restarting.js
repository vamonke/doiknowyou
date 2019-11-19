import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box } from "rebass";

import history from "../redux/history";
import { RedirectToLobby } from "../molecules";

const overlay = {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  bg: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const blackBox = {
  borderRadius: 20,
  bg: "darkpurple",
  p: 3,
  color: "white"
};

const Restarting = props => {
  const { room, viewer, players } = props;
  const { _id: viewerId } = viewer;
  // joinRoom(viewer);

  if (
    viewer._id &&
    room._id &&
    players.length > 0 &&
    players.find(player => player._id === viewerId)
  ) {
    console.log("Redirecting to room");
    setTimeout(() => history.push(`/lobby/${room.number}`));
  }

  return (
    <Box sx={overlay}>
      <Box sx={blackBox}>
        <RedirectToLobby />
        <Box pt={2}>Loading</Box>
      </Box>
    </Box>
  );
};

Restarting.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string,
    number: PropTypes.number
  }),
  viewer: PropTypes.shape({
    _id: PropTypes.string
  })
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
  return { ...state, players, viewer };
};

export default connect(mapStateToProps)(Restarting);
