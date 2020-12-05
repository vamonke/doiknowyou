import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";

const trim = questions =>
  questions.filter(
    question =>
      question.text &&
      (question.type === "players" ||
        question.type === "open" ||
        question.options.filter(Boolean).length > 1)
  );

const lobbyEvents = (io, socket, common) => {
  // Lobby: Start
  const startGame = async roomId => {
    const currentQuestion = await Question.draw(roomId, 1, null);
    const room = await Room.start(roomId);
    common.gameLog("Game start");
    io.to(roomId).emit("start", { room, currentQuestion });

    if (currentQuestion) {
      common.startTimer(currentQuestion);
    } else {
      common.gameOver(roomId);
    }
  }

  // Lobby: Start if all players are ready
  const startIfAllReady = async roomId => {
    const ready = await Room.isEveryPlayerReady(roomId);
    if (!ready) return false;
    startGame(roomId);
  };

  // Lobby: Player ready
  socket.on("ready", async questions => {
    if (socket.missingPlayer()) return;

    const trimmedQuestions = trim(questions);
    if (trimmedQuestions.length > 0) {
      await Question.createMany(
        trimmedQuestions,
        socket.player._id,
        socket.player.roomId
      );
    }

    const { _id: playerId, roomId } = await Player.ready(socket.player._id);
    common.playerLog(
      "is ready - " + trimmedQuestions.length + " questions added"
    );
    common.gameLog("Update player ready");
    io.to(roomId).emit("playerReady", playerId);

    const room = await Room.findById(roomId);
    if (room.status === "created") {
      startIfAllReady(roomId);
    }
  });

  // Lobby: Player not ready
  socket.on("notReady", async () => {
    if (socket.missingPlayer()) return;

    await Question.removeByPlayerId(socket.player._id);
    const { _id: playerId, roomId } = await Player.notReady(socket.player._id);
    common.playerLog("is not ready");
    common.gameLog("Update player not ready");
    io.to(roomId).emit("playerNotReady", playerId);

    const room = await Room.findById(roomId);
    if (room.status === "created") {
      startIfAllReady(roomId);
    }
  });

  Object.assign(common, { startIfAllReady, startGame });
};

export default lobbyEvents;
