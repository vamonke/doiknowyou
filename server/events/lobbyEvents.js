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


// Lobby: Start if all players are ready
export const startIfAllReady = async (io, roomId) => {
  const ready = await Room.isEveryPlayerReady(roomId);
  if (!ready) return false;
  
  const currentQuestion = await Question.draw(roomId, 1, null);
  const room = await Room.start(roomId);
  io.to(roomId).emit("start", { room, currentQuestion });
}

const lobbyEvents = (io, socket) => {
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

    const player = await Player.ready(socket.player._id);
    socket.playerLog("is ready");
    // socket.gameLog("Update player ready");
    io.to(player.roomId).emit("playerReady", player._id);

    startIfAllReady(io, player.roomId);
  });

  // Lobby: Player not ready
  socket.on("notReady", async () => {
    if (socket.missingPlayer()) return;

    await Question.removeByPlayerId(socket.player._id);
    const player = await Player.notReady(socket.player._id);
    socket.playerLog("is not ready");
    // socket.gameLog("Update player not ready");
    io.to(player.roomId).emit("playerNotReady", player._id);

    startIfAllReady(io, player.roomId);
  });
}

export default lobbyEvents;