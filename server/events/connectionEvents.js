import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

import { startIfAllReady } from "./lobbyEvents";
import { newHost } from "./hostEvents";

const getSocketPlayerIds = io => {
  const ids = [];
  const sockets = io.sockets.sockets;
  for (const key in sockets) {
    const player = sockets[key].player;
    if (player && player._id) ids.push(player._id);
  }
  return ids;
};

const connectionEvents = (io, socket) => {
  let players;
  const updatePlayers = async roomId => {
    players = await Player.findByRoom(roomId);
  };

  const emitPlayers = async roomId => {
    await updatePlayers(roomId);
    socket.gameLog("Update players - " + players.length);
    io.to(roomId).emit("updatePlayers", players);
  };

  const emitAnswers = async roomId => {
    const currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
    if (!currentQuestion) return;
    const answers = await Answer.findByQuestion(currentQuestion._id);
    const answeredPlayers = answers.map(answer => answer.playerId);
    socket.gameLog("Update answers - " + answeredPlayers.length);
    io.to(roomId).emit("updateAnswers", answeredPlayers);
  };

  const leaveRoom = async () => {
    if (!socket.player) return;

    const { _id, roomId } = socket.player;
    await Player.remove(_id);

    const room = await Room.findById(roomId);
    if (room.status === "created") {
      await Question.removeByPlayerId(_id);
      if (room.host === _id) {
        newHost(io, socket, roomId);
      }
    }

    socket.playerLog("left the room");
    socket.player = undefined;
    emitPlayers(roomId);

    if (room.status === "created") {
      startIfAllReady(io, roomId);
    }
  };

  socket.on("join", async player => {
    socket.player = player;
    const { roomId } = player;
    if (!socket.rooms.hasOwnProperty(roomId)) {
      socket.join(roomId, async () => {
        socket.playerLog("joined");
        emitPlayers(roomId);
        const room = await Room.findById(roomId);
        if (room.status !== "created") {
          emitAnswers(roomId);
          emitQuestions(roomId);
        }
      });
    } else {
      emitPlayers(roomId);
      const room = await Room.findById(roomId);
      if (room.status !== "created") {
        emitAnswers(roomId);
        emitQuestions(roomId);
      }
    }
  });

  socket.missingPlayer = () => {
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

  socket.on("leave", leaveRoom);

  socket.on("disconnect", () => {
    // Check if socket has a player attached
    if (!socket.player) return;
    // console.log("Socket: " + socket.id + " [DISCONNECTED]");

    const { _id, name } = socket.player;
    console.log("Socket: " + name + " [DISCONNECTED]");

    setTimeout(() => {
      const socketPlayerIds = getSocketPlayerIds(io);
      if (socketPlayerIds.includes(_id)) {
        // Another socket has been created with the same player id
        console.log("Socket: " + name + " [RECONNECTED]");
      } else {
        // No socket has been created with the same player id
        leaveRoom();
      }
    }, 1000);
  });
}

export default connectionEvents;