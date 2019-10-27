import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";

const hostEvents = (io, socket) => {
  const newHost = async (io, socket, roomId, playerId) => {
    if (!playerId) {
      playerId = await Player.getNextRecipientId(roomId);
    }
    const room = await Room.updateHost(roomId, playerId);
    socket.gameLog("New host: " + playerId);
    io.to(roomId).emit("newHost", room.host);
  };

  // Host: Update settings
  socket.on("updateSettings", async settings => {
    if (socket.missingPlayer()) return;

    const { timeLimit } = settings;
    const { player: { roomId } } = socket;

    if (settings.timeLimit || settings.timeLimit === 0) {
      const room = await Room.updateTimeLimit(roomId, timeLimit);
      socket.gameLog("Updated question time limit: " + timeLimit);
      io.to(roomId).emit("newSettings", { room });
    }
  });

  // Host: Update settings
  socket.on("makeHost", async playerId => {
    if (socket.missingPlayer()) return;

    const { player: { roomId } } = socket;
    newHost(io, socket, roomId, playerId);
  });

  // Host: Kick player
  socket.on("kickPlayer", async playerId => {
    if (socket.missingPlayer()) return;

    await Player.remove(playerId);

    const { player: { roomId } } = socket;
    const room = await Room.findById(roomId);
    if (room.status === "created") {
      await Question.removeByPlayerId(playerId);
      if (room.host === playerId) {
        newHost(io, socket, roomId);
      }
    }

    socket.gameLog("Kicked: " + playerId);
    // eslint-disable-next-line no-undef
    emitPlayers(roomId);

    if (room.status === "created") {
      // eslint-disable-next-line no-undef
      startIfAllReady(io, socket, roomId);
    }
  });
};

export default hostEvents;