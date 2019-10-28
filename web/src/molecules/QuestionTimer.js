import { useEffect, useState } from "react";

const QuestionTimer = ({ timeLimit, timesUp, currentQuestionId, type }) => {
  let duration = timeLimit;
  if (type === "open") duration *= 2;
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    setSeconds(duration);
  }, [currentQuestionId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("useEffect:", seconds, "seconds");
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

  return seconds === 0 ? "Time's up" : seconds;
};

export default QuestionTimer;
