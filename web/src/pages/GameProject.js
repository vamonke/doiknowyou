import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Text } from "rebass";

import { joinAsProjector } from "../redux/actions";
import { timesUp } from "../redux/client";
import { Modal, HomeLink } from "../atoms";
import { replaceWithName } from "../utils";

import { GamePlayerList } from "../molecules";
import {
  // CurrentQuestion,
  QuestionResults
} from "../organisms";

const GameProject = props => {
  const {
    room,
    currentQuestion,
    answeredQuestions,
    recipient,
    players,
    projector,
    joinAsProjector,
    dispatch
  } = props;
  const { _id: currentQuestionId, type } = currentQuestion || {};
  const { _id: roomId, status, timeLimit } = room;
  const { _id: recipientId, name: recipientName } = recipient;
  // const { hostId, status, timeLimit, gameMode } = room;
  const roomNo = room.number || props.match.params.roomNo;
  document.title = `Do I know you? #${roomNo}`;

  useEffect(() => {
    joinAsProjector(roomNo);
  }, [roomNo, joinAsProjector]);

  const lastQuestion = answeredQuestions[0] || {};
  useEffect(() => {
    console.log("useEffect: Show last question");
    setShowResults(answeredQuestions.length > 0);
  }, [lastQuestion._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showResults, setShowResults] = useState(true);

  if (!roomId) {
    return "Oh snap";
  }

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

      {/* {showCurrentQuestion && (
        <Box>
          {type === "open" ? (
            <OpenEndedQuestion
              question={currentQuestion}
              recipient={recipient}
              timer={timer}
            />
          ) : (
              <CurrentQuestion
                question={currentQuestion}
                recipientName={recipientName}
                timer={timer}
              />
            )}
        </Box>
      )} */}

      {showCurrentQuestion && (
        <QuestionText
          {...currentQuestion}
          recipientName={recipientName}
          timer={timer}
        />
      )}

      {players.length > 0 && (
        <GamePlayerList
          players={players}
          viewer={projector}
          recipientId={recipientId}
          gameOver={gameOver}
        />
      )}

      {/* <Box variant="container">
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
      </Box> */}

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

const QuestionText = props => {
  const { text, recipientName, isRecipient } = props;
  return (
    <>
      <Box variant="gradient" textAlign="center" pt={5}>
        <Box maxWidth={1440} variant="container">
          <Box variant="card.top.large" py={[5, 5]} px={[5, 5]}>
            {isRecipient ? (
              <Text color="yellow">It's your turn to answer</Text>
            ) : (
              <Text as="span" fontSize={8} color="grey">
                {"Hot seat: "}
                <Text as="span" color="yellow" fontWeight="medium">
                  {recipientName} {isRecipient && "(You)"}
                </Text>
              </Text>
            )}
            <Text
              mt={5}
              fontSize={10}
              fontWeight="medium"
              maxWidth={1024}
              mx="auto"
            >
              {replaceWithName(text, recipientName)}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box variant="container" maxWidth={1440} textAlign="center">
        <Box variant="card.bottom.small" py={[20, 20, 20, 4]}>
          <Text mb={[1, 1, 1, 2]} variant="subtitle" fontSize={7}>
            Guess {recipientName}’s answer
          </Text>
        </Box>
      </Box>
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
  const projector = { _id: "projector", name: "Projector" };
  return { ...state, players, recipient, projector };
};

const mapDispatchToProps = dispatch => ({
  joinAsProjector: roomNo => dispatch(joinAsProjector(roomNo))
});

// TODO: Use mapToDispatch
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameProject);
