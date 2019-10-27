import { useEffect, useState } from "react";

const QuestionCountdown = ({ timeLimit, timesUp }) => {
  const [seconds, setSeconds] = useState(timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => Math.max(seconds - 1, 0));
    }, 1000);
    if (seconds <= 0) {
      clearInterval(interval);
      console.log("Time's up");
      timesUp();
    }
    return () => clearInterval(interval);
  }, [seconds]); // eslint-disable-line react-hooks/exhaustive-deps

  return (seconds === 0 ? "Time's up" : seconds);
};

export default QuestionCountdown;
