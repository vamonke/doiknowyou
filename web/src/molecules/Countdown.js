import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Text } from "rebass";

const Countdown = ({ roomNo, history }) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => Math.max(seconds - 1, 0));
    }, 1000);
    if (seconds <= 0) {
      clearInterval(interval);
      console.log('START');
      history.push(`/game/${roomNo}`);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  // const interval = setInterval(countDown, 1000);

  return (
    <Text py={5} textAlign="center">
      Game starting in {seconds}
    </Text>
  );
};

export default withRouter(Countdown);
