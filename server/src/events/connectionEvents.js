import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

import { error, socketLog } from "../logger";

const getSocketPlayerIds = io => {
  const ids = [];
  const sockets = io.sockets.sockets;
  for (const key in sockets) {
    const player = sockets[key].player;
    if (player && player._id) ids.push(player._id);
  }
  return ids;
};

const connectionEvents = (io, socket, common) => {
  const emitPlayers = async roomId => {
    // TODO: Cache
    common.players = await Player.findByRoom(roomId);
    common.gameLog("Update player list - " + common.players.length + " players");
    io.to(roomId).emit("updatePlayers", common.players);
  };

  const hydrateRoom = async roomId => {
    const room = await Room.findById(roomId);
    common.playerLog("room hydrated");
    socket.emit("hydrateRoom", room);
  };

  const hydrateAnswers = async roomId => {
    const currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
    if (!currentQuestion) return;
    const answers = await Answer.findByQuestion(currentQuestion._id);
    const answeredPlayers = answers.map(answer => answer.playerId);
    if (currentQuestion.correctAnswer)
      answeredPlayers.push(currentQuestion.recipientId);
    common.playerLog("answered hydrated - " + answeredPlayers.length);
    socket.emit("hydrateAnswers", answeredPlayers);
  };

  const hydrateQuestions = async roomId => {
    const promises = [
      Question.getCurrentQuestionInRoomFull(roomId),
      Question.findAsked(roomId)
    ];
    const [currentQuestion, answeredQuestions] = await Promise.all(promises);
    common.playerLog("questions hydrated");
    socket.emit("hydrateQuestions", { currentQuestion, answeredQuestions });
  };

  const leaveRoom = async () => {
    if (!socket.player) return;

    const { _id, roomId } = socket.player;
    const room = await Room.findById(roomId);
    if (room.status === "ended") return;

    await Player.remove(_id);

    if (room.status === "created") {
      await Question.removeByPlayerId(_id);
      if (room.hostId === _id) {
        common.newHost(roomId, null);
      }
    }

    common.playerLog("left the room");
    delete socket.player;
    emitPlayers(roomId);

    if (room.status === "created") {
      common.startIfAllReady(roomId);
    } else if (room.status === "started") {
      const currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
      common.completeIfAllAnswered(currentQuestion);
    }
  };

  const hydrate = async roomId => {
    common.playerLog("joined");
    hydrateRoom(roomId);
    emitPlayers(roomId);
    const room = await Room.findById(roomId);
    if (room.status !== "created") {
      hydrateAnswers(roomId);
      hydrateQuestions(roomId);
    }
  };

  socket.on("join", async player => {
    socket.player = player;
    const { roomId } = player;
    const socketInRoom = Object.prototype.hasOwnProperty.call(
      socket.rooms,
      roomId
    );
    if (!socketInRoom) {
      socket.join(roomId, async () => {
        hydrate(roomId);
      });
    } else {
      hydrate(roomId);
    }
  });

  socket.missingPlayer = () => {
    if (!socket.player) {
      error("Missing player from socket: " + socket.id);
      socket.emit("refresh");
      // socket.emit("disconnected");
      return true;
    }
    const playerInRoom = common.players.some(
      player => player._id.toString() === socket.player._id
    );

    if (!playerInRoom) {
      error("Socket player not in player list: " + socket.player.name);
      socket.emit("disconnected");
      return true;
    }
    return false;
  };

  socket.on("leave", leaveRoom);

  socket.on("disconnect", async () => {
    if (!socket.player) return;

    const { _id, name, roomId } = socket.player;
    const room = await Room.findById(roomId);
    if (room.status === "ended") return;

    socketLog(name + " disconnected");

    setTimeout(() => {
      const socketPlayerIds = getSocketPlayerIds(io);
      if (socketPlayerIds.includes(_id)) {
        // Another socket has been created with the same player id
        socketLog(name + " reconnected");
      } else {
        // No socket has been created with the same player id
        leaveRoom();
      }
    }, 1000);
  });

  Object.assign(common, { emitPlayers });
};

export default connectionEvents;