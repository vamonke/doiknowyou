import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

const gameEvents = (io, socket) => {
  // Game: Over
  const gameOver = async roomId => {
    const newRoom = await Room.create();
    const room = await Room.gameOver(roomId, newRoom.number);
    socket.gameLog("Game Over");
    io.to(roomId).emit("gameOver", room);
  };

  // Game: End question if all players have answered
  const completeIfAllAnswered = async (roomId, question) => {
    const { _id: questionId, correctAnswer, recipientId, type } = question;
    if (!correctAnswer) return false;

    const completed = await Answer.hasEveryPlayerAnswered(roomId, questionId, recipientId);
    if (!completed) return false;

    socket.gameLog("Question completed");
    io.to(roomId).emit("completed");

    // Tabulate scores
    const answers = await Answer.findByQuestion(questionId);
    let players = [];
    if (correctAnswer.length > 0) {
      const correctAnswers = answers.filter(
        answer => correctAnswer.includes(answer.option)
      );
      const promises = correctAnswers.map(answer =>
        Player.addScore(answer.playerId)
      );
      players = await Promise.all(promises);
    }

    const answerIds = answers.map(answer => answer._id);
    const completedQuestion = await Question.complete(questionId, answerIds);

    // Send results
    socket.gameLog("Question results");
    io.to(roomId).emit("results", {
      question: completedQuestion,
      players
    });

    // Draw next question OR end the game
    const { round } = completedQuestion;
    const currentQuestion = await Question.draw(roomId, round + 1, recipientId);
    if (currentQuestion) {
      socket.gameLog("Next question");
      io.to(roomId).emit("nextQuestion", { currentQuestion });
    } else {
      gameOver(roomId);
    }
  };

  // Game: Update open-ended answers
  const openIfAllAnswered = async (roomId, question) => {
    const { _id: questionId, recipientId } = question;
    const allAnswered = await Answer.hasEveryPlayerAnswered(roomId, questionId, recipientId);
    if (!allAnswered) return false;

    const questionWithOptions = await Question.getOptions(questionId);
    socket.gameLog("Recipient to answer open-ended question");
    io.to(roomId).emit("openQuestion", { currentQuestion: questionWithOptions });
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
      currentQuestion = await Question.setCorrectAnswer(questionId, answerArray);
    } else {
      if (type === "open" && !isRecipient) {
        await Answer.insertOpen(answer, questionId, playerId);
      } else {
        await Answer.create(answer, questionId, playerId);
      }
    }

    socket.playerLog("answer", answer);

    if (type === "open" && !isRecipient) {
      io.to(roomId).emit("openAnswer", { playerId, answer });
      openIfAllAnswered(roomId, currentQuestion);
    } else { 
      io.to(roomId).emit("playerAnswer", playerId);
      completeIfAllAnswered(roomId, currentQuestion);
    }
  });
};

export default gameEvents;