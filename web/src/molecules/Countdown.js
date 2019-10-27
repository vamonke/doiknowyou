import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "rebass";
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
    <Text py={5} textAlign="center">
      Game starting in {seconds}
    </Text>
  );
};

Countdown.propTypes = {
  roomNo: PropTypes.number,
};

export default Countdown;
