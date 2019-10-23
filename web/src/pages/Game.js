import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Heading, Box } from "rebass";

import { joinRoom, playerAnswer } from "../redux/client";

import GamePlayerList from "../molecules/GamePlayerList";
import Disconnected from "../molecules/Disconnected";
import JoinGame from "../organisms/JoinGame";
import CurrentQuestion from "../organisms/CurrentQuestion";
import QuestionResults from "../organisms/QuestionResults";
import AnsweredQuestion from "../organisms/AnsweredQuestion";

const Game = (props) => {
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

  const lastQuestion = answeredQuestions.slice(-1).pop() || {};

  useEffect(() => {
    console.log("useEffect");
    joinRoom(viewer);
  }, [viewer._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    console.log("useEffect");
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
  }

  const showCurrentQuestion =
    room.status === "started" &&
    Object.keys(currentQuestion).length > 1;

  return (
    <>
      {room.status === "ended" &&
        "Game over"
      }

      {showCurrentQuestion &&
        <Card>
          <Heading variant="blackSmall">
            Round {currentQuestion.round}
          </Heading>
          <CurrentQuestion
            currentQuestion={currentQuestion}
            recipient={recipient}
            isRecipient={recipient._id === viewer._id}
            handleClick={handleClick}
            answer={answer}
          />
        </Card>
      }

      <Box mt={4} />

      {players.length > 0 &&
        <GamePlayerList
          players={players}
          viewer={viewer}
          recipientId={recipient._id}
        />
      }
      
      <Box mt={4} />

      {answeredQuestions.length > 0 &&
        <Card pb={0}>
          <Heading variant="blackSmall" mb={0}>
            Questions
          </Heading>
          {answeredQuestions.map((question, index) => 
            <AnsweredQuestion question={question} players={players} key={index} />
          )}
        </Card>
      }

      {showResults && answeredQuestions.length > 0 &&
        <QuestionResults
          question={lastQuestion}
          players={players}
          hide={() => setShowResults(false)}
        />
      }
    </>
  );
};

const mapStateToProps = (state = {}) => {
  const players = Object.values(state.players);
  const recipient = state.players[state.currentQuestion.recipientId] || {};
  const viewer = {
    ...state.viewer,
    ...state.players[state.viewer._id],
  };
  return { ...state, players, viewer, recipient };
};

export default connect(mapStateToProps)(Game);
