// import React from "react";
import { connect } from "react-redux";

const Disconnected = ({ disconnected = false }) => {
  if (disconnected) {
    return "Disconnected";
  }
  return "Connected";
};

const mapStateToProps = (state = {}) => {
  const { disconnected } = state;
  return { disconnected };
};

export default connect(mapStateToProps)(Disconnected);
