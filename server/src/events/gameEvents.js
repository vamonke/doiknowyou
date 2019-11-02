import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

import { warn } from "../logger";

const gameEvents = async (io, socket, common) => {
  let timeLimit = false;
  const getTimeLimit = async roomId => {
    const room = await Room.findById(roomId);
    timeLimit = room.timeLimit;
  };

  // Game: Start timing
  const startTimer = async question => {
    if (timeLimit === false) await getTimeLimit(question.roomId);

    if (timeLimit !== 0) {
      let duration = (timeLimit + 0.5) * 1000;
      let callback = endQuestion;

      if (question.type === "open") {
        duration *= 2;
        if (!question.isClosed) callback = closeQuestion;
        return; // Disable timeout for open-ended questions
      }

      if (question.round === 1) duration += 3500;

      common.gameLog(duration / 1000 + "s given");

      setTimeout(async () => {
        const timedOutQuestion = await Question.findById(question._id);
        if (timedOutQuestion.status === "asking") {
          common.gameLog("Times up for question");
          callback(question);
        }
      }, duration);
    }
  };

  // Game: End question
  const endQuestion = async question => {
    const { _id: questionId, roomId, correctAnswer, recipientId } = question;

    common.gameLog("Question completed");
    io.to(roomId).emit("completed");

    // Tabulate scores
    const answers = await Answer.findByQuestion(questionId);
    let players = [];
    if (correctAnswer && correctAnswer.length > 0) {
      const promises = answers
        .filter(answer => correctAnswer.includes(answer.option))
        .map(answer => Player.addScore(answer.playerId));
      players = await Promise.all(promises);
    } else {
      // TODO: Deduct recipient score
    }

    const answerIds = answers.map(answer => answer._id);
    const completedQuestion = await Question.complete(questionId, answerIds);

    // Send results
    common.gameLog("Question results");
    io.to(roomId).emit("results", {
      question: completedQuestion,
      players
    });

    // Draw next question OR end the game
    const { round } = completedQuestion;
    const nextQuestion = await Question.draw(roomId, round + 1, recipientId);
    if (nextQuestion) {
      common.gameLog("Next question - " + nextQuestion.text);
      io.to(roomId).emit("nextQuestion", { currentQuestion: nextQuestion });
      startTimer(nextQuestion);
    } else {
      gameOver(roomId);
    }
  };

  // Game: Over
  const gameOver = async roomId => {
    const newRoom = await Room.create();
    const room = await Room.gameOver(roomId, newRoom.number);
    common.gameLog("Game Over");
    io.to(roomId).emit("gameOver", room);
  };

  // Game: End question if all players have answered
  const completeIfAllAnswered = async question => {
    const { _id: questionId, roomId, correctAnswer, recipientId } = question;
    if (!correctAnswer) {
      const recipient = await Player.findById(recipientId);
      if (recipient) return;
      warn("Recipient not in game -", recipientId);
    }

    const completed = await Answer.hasEveryPlayerAnswered(
      roomId,
      questionId,
      recipientId
    );
    if (!completed) return false;

    endQuestion(question);
  };

  // Game: Update open-ended answers
  const closeQuestion = async question => {
    const { _id: questionId, roomId } = question;
    const questionWithOptions = await Question.openToRecipient(questionId);
    const { options } = questionWithOptions;

    if (!options || options.length === 0) {
      const skippedQuestion = await Question.findById(questionId);
      return endQuestion(skippedQuestion);
    }

    common.gameLog("Recipient to answer open-ended question");
    io.to(roomId).emit("openQuestion", {
      currentQuestion: questionWithOptions
    });
    startTimer({ ...questionWithOptions, roomId });
  };

  // Game: Update open ended question if all answered
  const closeIfAllAnswered = async question => {
    const { _id: questionId, roomId, recipientId } = question;
    const allAnswered = await Answer.hasEveryPlayerAnswered(
      roomId,
      questionId,
      recipientId
    );
    if (allAnswered) closeQuestion(question);
  };

  // Game: Player answer
  socket.on("answer", async answer => {
    if (socket.missingPlayer()) return;

    const { _id: playerId, roomId } = socket.player;
    let currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
    const { _id: questionId, recipientId, type } = currentQuestion;
    const isRecipient = playerId === recipientId;

    if (isRecipient) {
      let answerArray = Array.isArray(answer) ? answer : [answer];
      answerArray = answerArray.map(Number);
      currentQuestion = await Question.setCorrectAnswer(
        questionId,
        answerArray
      );
    } else {
      if (type === "open" && !isRecipient) {
        await Answer.insertOpen(answer, questionId, playerId);
      } else {
        await Answer.create(answer, questionId, playerId);
      }
    }

    currentQuestion.roomId = roomId;
    common.playerLog("answer - " + answer);

    if (type === "open" && !isRecipient) {
      io.to(roomId).emit("openAnswer", { playerId, answer });
      closeIfAllAnswered(currentQuestion);
    } else {
      io.to(roomId).emit("playerAnswer", playerId);
      completeIfAllAnswered(currentQuestion);
    }
  });

  Object.assign(common, { startTimer, completeIfAllAnswered });
};

export default gameEvents;
