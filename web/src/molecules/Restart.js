import React from "react";
import { Button } from "rebass";
import { connect } from "react-redux";
import { leave, joinGame } from "../redux/actions";

const Restart = ({ nextRoomNo, viewerName, dispatch }) => {
  const onClick = () => {
    dispatch(leave());
    dispatch(joinGame(nextRoomNo, viewerName));
  }
  return (
    <Button width={1} onClick={onClick}>
      Restart
    </Button>
  );
};

export default connect()(Restart);