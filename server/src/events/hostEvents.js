import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";

const hostEvents = (io, socket, common) => {
  const newHost = async (roomId, playerId) => {
    if (!playerId) {
      playerId = await Player.getNextRecipientId(roomId);
    }
    const room = await Room.updateHost(roomId, playerId);
    common.gameLog("New host - " + playerId);
    io.to(roomId).emit("newHost", room.hostId);
  };

  // Host: Update settings
  socket.on("updateSettings", async settings => {
    if (socket.missingPlayer()) return;

    const { timeLimit } = settings;
    const { player: { roomId } } = socket;

    if (settings.timeLimit || settings.timeLimit === 0) {
      const room = await Room.updateTimeLimit(roomId, timeLimit);
      common.gameLog("Updated question time limit - " + timeLimit);
      io.to(roomId).emit("newSettings", { room });
    }
  });

  // Host: Update settings
  socket.on("makeHost", async playerId => {
    if (socket.missingPlayer()) return;

    const { player: { roomId } } = socket;
    newHost(roomId, playerId);
  });

  // Host: Kick player
  socket.on("kickPlayer", async playerId => {
    if (socket.missingPlayer()) return;

    await Player.remove(playerId);

    const { player: { roomId } } = socket;
    let room = await Room.findById(roomId);
    if (room.status === "created") {
      await Question.removeByPlayerId(playerId);
      if (room.hostId === playerId) {
        room = newHost(roomId, null);
      }
    }

    common.gameLog("Kicked: " + playerId);

    // Emit players
    common.emitPlayers(roomId);

    if (room.status === "created") {
      common.startIfAllReady(roomId);
    }
  });

  Object.assign(common, { newHost });
};

export default hostEvents;