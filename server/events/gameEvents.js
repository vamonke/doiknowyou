import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

const gameEvents = (io, socket) => {
  // Game: Over
  const gameOver = (roomId) => {
    socket.gameLog("Game Over");
    io.to(roomId).emit("gameover");
  }

  // Game: End question if all players have answered
  const completeIfAllAnswered = async (roomId, question) => {
    const { _id: questionId, correctAnswer, recipientId } = question;
    const completed = await Answer.hasEveryPlayerAnswered(roomId, questionId);
    if (!completed) return false;

    socket.gameLog("Question completed");
    io.to(roomId).emit("completed");

    // Tabulate scores
    const answers = await Answer.getAnswersByQuestion(questionId);
    const correctAnswers = answers.filter(
      answer =>
        answer.option === correctAnswer &&
        answer.playerId !== recipientId
    );
    const promises = correctAnswers.map(answer => {
      return Player.addScore(answer.playerId);
    });
    const players = await Promise.all(promises);
    const completedQuestion = await Question.complete(questionId);

    // Send results
    socket.gameLog("Question results");
    io.to(roomId).emit("results", {
      question: { ...completedQuestion, answers },
      players
    });

    // Draw next question
    const { round } = completedQuestion;
    const currentQuestion = await Question.draw(roomId, round + 1, recipientId);
    if (currentQuestion) {
      socket.gameLog("Next question");
      io.to(roomId).emit("start", { currentQuestion });
    } else {
      gameOver(roomId);
    }
  };

  // Game: Player answer
  socket.on("answer", async answer => {
    if (socket.missingPlayer()) return;

    const { _id: playerId, roomId } = socket.player;
    let currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
    // console.log(currentQuestion);
    await Answer.create(answer, currentQuestion._id, playerId);

    if (playerId === currentQuestion.recipientId) {
      currentQuestion = await Question.setAnswer(currentQuestion._id, answer);
    }

    socket.playerLog("answer", answer);
    io.to(roomId).emit("playerAnswer", playerId);

    completeIfAllAnswered(roomId, currentQuestion);
  });
};

export default gameEvents;
