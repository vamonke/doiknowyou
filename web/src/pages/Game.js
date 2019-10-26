import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Heading, Box, Text } from "rebass";

import { joinRoom, playerAnswer } from "../redux/client";

import { GamePlayerList, Disconnected, Restart } from "../molecules";
import {
  JoinGame,
  CurrentQuestion,
  QuestionResults,
  AnsweredQuestion,
  OpenEndedQuestion
} from "../organisms";

const Game = props => {
  const {
    room,
    answer,
    currentQuestion,
    answeredQuestions,
    recipient,
    viewer,
    players,
    dispatch
  } = props;

  useEffect(() => {
    console.log("useEffect: Join room");
    joinRoom(viewer);
  }, [viewer._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showResults, setShowResults] = useState(true);
  const lastQuestion = answeredQuestions[0] || {};

  useEffect(() => {
    console.log("useEffect: Show last question");
    setShowResults(true);
  }, [lastQuestion._id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!viewer._id || !room._id) {
    return <JoinGame lobby />;
  }

  document.title = `Do I know you? #${room.number}`;

  if (
    players.length > 0 &&
    !players.find(player => player._id === viewer._id)
  ) {
    return <Disconnected />;
  }

  const handleClick = index => {
    dispatch(playerAnswer(index));
  };

  const showCurrentQuestion =
    room.status === "started" && Object.keys(currentQuestion).length > 1;

  return (
    <>
      {room.status === "ended" && (
        <Text
          textAlign="center"
          fontSize={4}
          fontWeight="medium"
          mt={3}
          mb={-2}
        >
          Game over
        </Text>
      )}

      {showCurrentQuestion && (
        <Card>
          <Heading variant="blackSmall">Round {currentQuestion.round}</Heading>
          {currentQuestion.type === "open" ? (
            <OpenEndedQuestion
              question={currentQuestion}
              recipient={recipient}
              isRecipient={recipient._id === viewer._id}
              handleSubmit={handleClick}
              answer={answer}
            />
          ) : (
            <CurrentQuestion
              question={currentQuestion}
              recipient={recipient}
              isRecipient={recipient._id === viewer._id}
              handleClick={handleClick}
              answer={answer}
            />
          )}
        </Card>
      )}

      <Box mt={4} />

      {players.length > 0 && (
        <GamePlayerList
          players={players}
          viewer={viewer}
          recipientId={recipient._id}
        />
      )}

      <Box mt={4} />

      {answeredQuestions.length > 0 && (
        <Card pb={0}>
          <Heading variant="blackSmall" mb={0}>
            Questions
          </Heading>
          {answeredQuestions.map((question, index) => (
            <AnsweredQuestion
              question={question}
              players={players}
              key={index}
            />
          ))}
        </Card>
      )}

      {room.status === "ended" && room.nextRoomNo && (
        <Box mt={4}>
          <Restart nextRoomNo={room.nextRoomNo} viewerName={viewer.name} />
        </Box>
      )}

      {showResults && answeredQuestions.length > 0 && (
        <QuestionResults
          question={lastQuestion}
          players={players}
          hide={() => setShowResults(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players).sort((a, b) => b.score - a.score);
  const recipient = state.players[state.currentQuestion.recipientId] || {};
  const viewer = {
    ...state.viewer,
    ...state.players[state.viewer._id]
  };
  return { ...state, players, viewer, recipient };
};

export default connect(mapStateToProps)(Game);
