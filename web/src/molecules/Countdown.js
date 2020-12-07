import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "rebass";
import history from "../redux/history";

const Countdown = ({ roomNo }) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => Math.max(seconds - 1, 0));
    }, 1000);
    if (seconds <= 0) {
      clearInterval(interval);
      console.log("START");
      history.push(`/game/${roomNo}`);
    }
    return () => clearInterval(interval);
  }, [seconds]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box variant="orange">
        <Box variant="container">
          <Box variant="card.top.xsmall">Room {roomNo}</Box>
        </Box>
      </Box>
      <Box px={[0, 2, 3]} fontSize={4}>
        <Box variant="card.bottom">
          <Box py={[4, 3]} textAlign="center">
            Game starting in {seconds}
          </Box>
        </Box>
      </Box>
    </>
  );
};

Countdown.propTypes = {
  roomNo: PropTypes.number
};

export default Countdown;
