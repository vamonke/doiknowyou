import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Flex, Card, Heading, Box, Text } from "rebass";

import { joinRoom, playerAnswer, timesUp } from "../redux/client";
import { Modal } from "../atoms";

import {
  GamePlayerList,
  Disconnected,
  Restart,
  QuestionTimer
} from "../molecules";
import {
  JoinGame,
  CurrentQuestion,
  QuestionResults,
  AnsweredQuestion,
  OpenEndedQuestion
} from "../organisms";

// To enable timer for open-ended
// Line 36: isClosed = false
// Line 76: (type === "open" ? isRecipient === isClosed : true );

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
  const { _id: currentQuestionId, type, round } = currentQuestion || {};
  const { _id: roomId, number: roomNo, nextRoomNo, status, timeLimit } = room;
  const { _id: viewerId, name: viewerName } = viewer;
  const { _id: recipientId, name: recipientName } = recipient;
  const isRecipient = recipientId === viewerId;

  useEffect(() => {
    console.log("useEffect: Join room");
    joinRoom(viewer);
  }, [viewerId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showResults, setShowResults] = useState(true);
  const lastQuestion = answeredQuestions[0] || {};

  useEffect(() => {
    console.log("useEffect: Show last question");
    setShowResults(answeredQuestions.length > 0);
  }, [lastQuestion._id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!viewerId || !roomId) {
    return <JoinGame lobby />;
  }

  document.title = `Do I know you? #${roomNo}`;

  if (players.length > 0 && !players.find(player => player._id === viewerId)) {
    return <Disconnected />;
  }

  const handleClick = index => {
    dispatch(playerAnswer(index));
  };

  const handleTimesUp = () => {
    dispatch(timesUp());
  };

  const showCurrentQuestion =
    status === "started" &&
    currentQuestion &&
    Object.keys(currentQuestion).length > 1;

  const showTimer = timeLimit !== 0 && type !== "open";

  return (
    <>
      {status === "ended" && (
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
          <Heading variant="blackSmall">
            <Flex justifyContent="space-between">
              <Text>Round {round}</Text>
              {showTimer && (
                <QuestionTimer
                  timeLimit={timeLimit}
                  timesUp={handleTimesUp}
                  currentQuestionId={currentQuestionId}
                  type={type}
                />
              )}
            </Flex>
          </Heading>
          {type === "open" ? (
            <OpenEndedQuestion
              question={currentQuestion}
              recipient={recipient}
              isRecipient={isRecipient}
              handleSubmit={handleClick}
              answer={answer}
            />
          ) : (
            <CurrentQuestion
              question={currentQuestion}
              recipientName={recipientName}
              isRecipient={isRecipient}
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
          recipientId={recipientId}
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

      {status === "ended" && nextRoomNo && (
        <Box mt={4}>
          <Restart nextRoomNo={nextRoomNo} viewerName={viewerName} />
        </Box>
      )}

      <Modal isOpen={showResults} hide={() => setShowResults(false)}>
        <QuestionResults
          question={lastQuestion}
          players={players}
          hide={() => setShowResults(false)}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players).sort(
    (a, b) => b.score - a.score
  );
  const recipientId =
    state.currentQuestion && state.currentQuestion.recipientId;
  const recipient = recipientId ? state.players[recipientId] : {};
  const viewer = {
    ...state.viewer,
    ...state.players[state.viewerId]
  };
  return { ...state, players, viewer, recipient };
};

export default connect(mapStateToProps)(Game);
