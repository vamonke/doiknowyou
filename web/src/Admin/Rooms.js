import React from "react";
import { connect } from "react-redux";
import { Heading } from "rebass";

const Rooms = () => {
  return <Heading>Rooms go here</Heading>;
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(Rooms);
