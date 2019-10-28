import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

const gameEvents = async (io, socket, common) => {
  let timeLimit = null;
  const getTimeLimit = async roomId => {
    const room = await Room.findById(roomId);
    timeLimit = room.timeLimit;
  };

  // Game: Start timing
  const startTimer = async question => {
    // console.log("startTimer");
    if (timeLimit === null) await getTimeLimit(question.roomId);
    // console.log("timeLimit", timeLimit);
    if (timeLimit !== 0) {
      // console.log("question.type", question.type);
      if (question.type !== "open") {
        let duration = (timeLimit + 1) * 1000;
        if (question.round === 1) duration += 4000;

        common.gameLog(duration / 1000 + "s given");
        setTimeout(async () => {
          const timedOutQuestion = await Question.findById(question._id);
          if (timedOutQuestion.status === "asking") {
            common.gameLog("Times up for question");
            endQuestion(question);
          }
        }, duration);
      }
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
      common.gameLog("Next question");
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
      const recipientInGame = common.players.some(
        player => player._id.toString() === recipientId
      );
      if (recipientInGame) return;
      console.log("Recipient not in game - ", common.players);
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
  const openIfAllAnswered = async question => {
    const { _id: questionId, roomId, recipientId } = question;
    const allAnswered = await Answer.hasEveryPlayerAnswered(
      roomId,
      questionId,
      recipientId
    );
    if (!allAnswered) return false;

    const questionWithOptions = await Question.getOptions(questionId);
    common.gameLog("Recipient to answer open-ended question");
    io.to(roomId).emit("openQuestion", {
      currentQuestion: questionWithOptions
    });
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
      openIfAllAnswered(currentQuestion);
    } else {
      io.to(roomId).emit("playerAnswer", playerId);
      completeIfAllAnswered(currentQuestion);
    }
  });

  Object.assign(common, { startTimer, completeIfAllAnswered });
};

export default gameEvents;
