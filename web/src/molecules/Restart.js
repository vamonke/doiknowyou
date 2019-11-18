import React from "react";
import PropTypes from "prop-types";
import { Button } from "rebass";
import { connect } from "react-redux";
import { leave, joinGame } from "../redux/actions";

import history from "../redux/history";

const Restart = ({ nextRoomNo, viewerName, dispatch }) => {
  const onClick = () => {
    dispatch(leave());
    dispatch(joinGame(nextRoomNo, viewerName));
    history.push(`/restart/${nextRoomNo}`);
  };
  return (
    <Button width={1} onClick={onClick}>
      Restart
    </Button>
  );
};

Restart.propTypes = {
  nextRoomNo: PropTypes.number.isRequired,
  viewerName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Restart);
