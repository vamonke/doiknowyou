import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";

import { startIfAllReady } from "./lobbyEvents";

const hostEvents = (io, socket) => {
  const emitPlayers = async roomId => {
    const players = await Player.findByRoom(roomId);
    socket.gameLog("Update players - " + players.length);
    io.to(roomId).emit("updatePlayers", { players });
  };

  // Host: Update settings
  socket.on("updateSettings", async settings => {
    if (socket.missingPlayer()) return;

    const { timeLimit } = settings;
    const { player: { roomId } } = socket;

    if (settings.hasOwnProperty("timeLimit")) {
      const room = await Room.updateTimeLimit(roomId, timeLimit);
      socket.gameLog("Updated question time limit: " + timeLimit);
      io.to(roomId).emit("newSettings", { room });
    }
  });

  // Host: Update settings
  socket.on("makeHost", async playerId => {
    if (socket.missingPlayer()) return;

    const { player: { roomId } } = socket;
    const room = await Room.updateHost(roomId, playerId);
    socket.gameLog("New host: " + playerId);
    io.to(roomId).emit("newHost", room.host);
  });

  // Host: Kick player
  socket.on("kickPlayer", async playerId => {
    if (socket.missingPlayer()) return;

    await Player.remove(playerId);

    const { player: { roomId } } = socket;
    const room = await Room.findById(roomId);
    if (room.status === "created") {
      await Question.removeByPlayerId(playerId);
    }

    socket.gameLog("Kicked: " + playerId);
    emitPlayers(roomId);

    if (room.status === "created") {
      startIfAllReady(io, roomId);
    }
  });
}

export default hostEvents;