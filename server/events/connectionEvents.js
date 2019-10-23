import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

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
    // const clients = io.sockets.sockets;
    // const clientCount = Object.keys(clients).length;
    socket.gameLog("Update players - " + players.length);
    io.to(roomId).emit("updatePlayers", { players });
  };

  const emitAnswers = async roomId => {
    const currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
    if (!currentQuestion) return;
    const answers = await Answer.findByQuestion(currentQuestion._id);
    const answeredPlayers = answers.map(answer => answer.playerId);
    socket.gameLog("Update answers - " + answeredPlayers.length);
    io.to(roomId).emit("updateAnswers", answeredPlayers);
  };

  const emitQuestions = async roomId => {
    const answeredQuestions = await Question.findAsked(roomId);
    socket.gameLog("Update answered questions - " + answeredQuestions.length);
    socket.emit("updateQuestions", answeredQuestions);
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
          // TODO: Remove question if lobby
          socket.playerLog("left the room");
          socket.player = undefined;
          emitPlayers(roomId);
        }
      }, 1000);
    } else {
      // console.log("Socket: " + socket.id + " [DISCONNECTED]");
    }
  });
}

export default connectionEvents;