// import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Log from "../logger";

const getSocketPlayerIds = io => {
  const ids = [];
  const sockets = io.sockets.sockets;
  for (const key in sockets) {
    const player = sockets[key].player;
    if (player && player._id) ids.push(player._id);
  }
  return ids;
};

const socketEvents = (io, socket) => {
  // console.log("Socket: " + socket.id + " [CONNECTED]");

  const gameLog = msg => {
    if (socket.player && socket.player.roomId)
      Log.gameLog(socket.player.roomId, msg);
  };

  const playerLog = msg => {
    if (socket.player) Log.playerLog(socket.player, msg);
  };

  let players;
  const updatePlayers = async roomId => {
    players = await Player.findByRoom(roomId);
  };

  // Emit
  const emitPlayers = async roomId => {
    await updatePlayers(roomId);
    gameLog("Update players");
    io.to(roomId).emit("updatePlayers", { players });
  };

  // On
  socket.on("join", player => {
    socket.player = player;
    const { roomId } = player;
    if (!socket.rooms.hasOwnProperty(roomId)) {
      socket.join(roomId, () => {
        emitPlayers(roomId);
      });
    }
  });

  const socketMissingPlayer = () => {
    if (!socket.player) {
      console.error(
        "\x1b[31mMissing player from socket:",
        socket.id,
        "\x1b[0m"
      );
      socket.emit("refresh");
      // socket.emit("disconnected");
      return true;
    }
    if (
      !players.map(player => player._id.toString()).includes(socket.player._id)
    ) {
      console.log(players);
      console.log(socket.player);
      console.error(
        "\x1b[31mSocket player not in player list:",
        socket.player.name,
        "\x1b[0m"
      );
      socket.emit("disconnected");
      return true;
    }
    return false;
  };

  socket.on("ready", async questions => {
    if (socketMissingPlayer()) return;

    await Question.createMany(
      questions,
      socket.player._id,
      socket.player.roomId
    );
    const player = await Player.ready(socket.player._id);
    playerLog("is ready");
    // gameLog("Update player ready");
    io.to(player.roomId).emit("playerReady", player._id);
  });

  socket.on("notReady", async () => {
    if (socketMissingPlayer()) return;

    await Question.removeByPlayerId(socket.player._id);
    const player = await Player.notReady(socket.player._id);
    playerLog("is not ready");
    // gameLog("Update player not ready");
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
