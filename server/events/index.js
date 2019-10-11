// import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Log from "../logger";

const getSocketPlayerIds = io => {
  const ids = [];
  const sockets = io.sockets.sockets;
  for (const key in sockets) {
    const player = sockets[key].player;
    if (player && player._id)
      ids.push(player._id);
  }
  return ids;
};

const socketEvents = (io, socket) => {
  // console.log("Socket: " + socket.id + " [CONNECTED]");

  const gameLog = (msg) => {
    if (socket.player && socket.player.roomId)
      Log.gameLog(socket.player.roomId, msg);
  }

  const playerLog = (msg) => {
    if (socket.player)
      Log.playerLog(socket.player, msg);
  }

  // Emit
  const emitPlayers = async roomId => {
    const players = await Player.findByRoom(roomId);
    gameLog("Update players");
    io.to(roomId).emit("updatePlayers", { players });
  };

  // On
  socket.on("join", viewer => {
    socket.player = viewer;
    const { roomId } = viewer;
    if (!socket.rooms.hasOwnProperty(roomId)) {
      socket.join(roomId, () => {
        emitPlayers(roomId);
      });
    }
  });

  socket.on("ready", async () => {
    const player = await Player.ready(socket.player._id);
    playerLog("is ready");
    gameLog("Update player ready");
    io.to(player.roomId).emit("playerReady", player._id);
  });

  socket.on("notReady", async () => {
    const player = await Player.notReady(socket.player._id);
    playerLog("is not ready");
    gameLog("Update player not ready");
    io.to(player.roomId).emit("playerNotReady", player._id);
  });

  socket.on("disconnect", () => {
    // Check if socket has a player attached
    if (socket.player) {
      const { _id, name, roomId } = socket.player;
      console.log("Socket: " + name + " [DISCONNECTED]");
      setTimeout(async () => {
        const socketPlayerIds = getSocketPlayerIds(io);
        if (socketPlayerIds.includes(_id)) {
          // Another socket has been created with the same player id
          console.log("Socket: " + name + " [RECONNECTED]");
        } else {
          // No socket has been created with the same player id
          await Player.leave(_id);
          playerLog("left the room");
          emitPlayers(roomId);
        }
      }, 1000);
    } else {
      // console.log("Socket: " + socket.id + " [DISCONNECTED]");
    }
  });
};

export default socketEvents;
