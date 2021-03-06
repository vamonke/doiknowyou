import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box } from "rebass";

import { playerAnswer, timesUp } from "../redux/client";
import { Modal, HomeLink } from "../atoms";

import { GamePlayerList, Disconnected, Restart } from "../molecules";
import {
  JoinGameCard,
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
  const { _id: currentQuestionId, type } = currentQuestion || {};
  const { _id: roomId, number: roomNo, nextRoomNo, status, timeLimit } = room;
  const { _id: viewerId, name: viewerName } = viewer;
  const { _id: recipientId, name: recipientName } = recipient;
  const isRecipient = recipientId === viewerId;

  // useEffect(() => {
  //   console.log("useEffect: Join room");
  //   joinRoom(viewer);
  // }, [viewerId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showResults, setShowResults] = useState(true);
  const lastQuestion = answeredQuestions[0] || {};

  useEffect(() => {
    console.log("useEffect: Show last question");
    setShowResults(answeredQuestions.length > 0);
  }, [lastQuestion._id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!viewerId || !roomId) {
    return <JoinGameCard />;
  }

  document.title = `Do I know you? #${roomNo}`;

  if (players.length > 0 && !players.find(player => player._id === viewerId)) {
    return <Disconnected />;
  }

  const handleClick = answer => {
    // answer is an index or an array of indexes
    dispatch(playerAnswer(answer));
  };

  const handleTimesUp = () => {
    dispatch(timesUp());
  };

  const showCurrentQuestion =
    status === "started" &&
    currentQuestion &&
    Object.keys(currentQuestion).length > 1;

  const showTimer = timeLimit !== 0 && type !== "open";
  const gameOver = status === "ended";

  const timer = showTimer && {
    timeLimit: timeLimit,
    timesUp: handleTimesUp,
    currentQuestionId: currentQuestionId,
    type: type
  };

  return (
    <>
      {
        <Box
          textAlign="center"
          variant="gradient"
          fontWeight="medium"
          color="white"
          fontSize={3}
          py={gameOver ? 4 : 3}
        >
          {gameOver && "Game over"}
        </Box>
      }

      {showCurrentQuestion && (
        <Box>
          {type === "open" ? (
            <OpenEndedQuestion
              question={currentQuestion}
              recipient={recipient}
              isRecipient={isRecipient}
              handleSubmit={handleClick}
              answer={answer}
              timer={timer}
            />
          ) : (
            <CurrentQuestion
              question={currentQuestion}
              recipientName={recipientName}
              isRecipient={isRecipient}
              handleClick={handleClick}
              answer={answer}
              timer={timer}
            />
          )}
        </Box>
      )}

      {players.length > 0 && (
        <GamePlayerList
          players={players}
          viewer={viewer}
          recipientId={recipientId}
          gameOver={gameOver}
        />
      )}

      <Box variant="container">
        {answeredQuestions.length > 0 && (
          <>
            <Box variant="card.top.xsmall">Questions</Box>
            <Box variant="card.bottom.xsmall" pb={2}>
              {answeredQuestions.map((question, index) => (
                <AnsweredQuestion
                  question={question}
                  players={players}
                  key={index}
                />
              ))}
            </Box>
          </>
        )}

        {gameOver && nextRoomNo && (
          <Restart nextRoomNo={nextRoomNo} viewerName={viewerName} />
        )}
      </Box>

      <HomeLink />

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
  const recipient = (recipientId && state.players[recipientId]) || {};
  const viewer = {
    ...state.viewer,
    ...state.players[state.viewerId]
  };
  return { ...state, players, viewer, recipient };
};

export default connect(mapStateToProps)(Game);
