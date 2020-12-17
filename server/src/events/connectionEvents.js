import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as Answer from "../models/Answer";

import { error, socketLog } from "../logger";

const connectionEvents = (io, socket, common) => {
  const emitPlayers = async (roomId) => {
    // TODO: Cache
    common.players = await Player.findByRoom(roomId);
    common.gameLog(
      "Update player list - " + common.players.length + " players"
    );
    io.to(roomId).emit("updatePlayers", common.players);

    const room = await Room.findById(roomId);
    common.gameLog("Emit host - " + room.hostId);
    io.to(roomId).emit("newHost", room.hostId);
  };

  const hydrateRoom = async (roomId) => {
    const room = await Room.findById(roomId);
    common.playerLog("room hydrated");
    socket.emit("hydrateRoom", room);
  };

  const hydrateAnswers = async (roomId) => {
    const currentQuestion = await Question.getCurrentQuestionInRoom(roomId);
    if (!currentQuestion) return;
    const answers = await Answer.findByQuestion(currentQuestion._id);
    const answeredPlayers = answers.map((answer) => answer.playerId);
    if (currentQuestion.correctAnswer)
      answeredPlayers.push(currentQuestion.recipientId);
    common.playerLog("answered hydrated - " + answeredPlayers.length);
    socket.emit("hydrateAnswers", answeredPlayers);
  };

  const hydrateQuestions = async (roomId) => {
    const promises = [
      Question.getCurrentQuestionInRoomFull(roomId),
      Question.findAsked(roomId),
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
      if (String(room.hostId) === _id) {
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

  const disconnect = async () => {
    if (!socket.player) return;

    const { _id, roomId } = socket.player;
    const room = await Room.findById(roomId);
    if (room.status === "ended") return;

    await Player.disconnect(_id);
    common.playerLog("disconnected");
    emitPlayers(roomId);

    removePlayerIfInactive(_id);

    if (String(room.hostId) === _id) {
      common.newHost(roomId, null);
    }
  };

  const removePlayer = async (playerId) => {
    await Player.remove(playerId);

    const { player: { roomId } } = socket;
    let room = await Room.findById(roomId);

    console.log({ room, playerId });

    if (String(room.hostId) === playerId) {
      room = await common.newHost(roomId, null);
    }

    if (room.status === "created") {
      await Question.removeByPlayerId(playerId);
    }

    common.gameLog("Removed player: " + playerId);

    // Emit players
    common.emitPlayers(roomId);

    if (room.status === "created") {
      common.startIfAllReady(roomId);
    }
  };

  const removePlayerIfInactive = async (playerId) => {
    const reconnectTime = 10 * 1000;
    setTimeout(async () => {
      const isDisconnected = await Player.isDisconnected(playerId);
      common.playerLog(isDisconnected ? "is still disconnected" : "has reconnected");
      if (isDisconnected) removePlayer(playerId);
    }, reconnectTime);
  };

  const hydrate = async (roomId) => {
    common.playerLog("joined");
    hydrateRoom(roomId);
    emitPlayers(roomId);
    const room = await Room.findById(roomId);
    if (room.status !== "created") {
      hydrateAnswers(roomId);
      hydrateQuestions(roomId);
    }
  };

  socket.on("join", async (player) => {
    socket.player = player;
    const { _id, roomId } = player;
    const socketInRoom = Object.prototype.hasOwnProperty.call(
      socket.rooms,
      roomId
    );
    await Player.connected(_id);
    if (!socketInRoom) {
      socket.join(roomId, async () => {
        socketLog(player.name + " connected to room");
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
      (player) => player._id.toString() === socket.player._id
    );

    if (!playerInRoom) {
      error("Socket player not in player list: " + socket.player.name);
      socket.emit("kick");
      return true;
    }
    return false;
  };

  socket.on("leave", leaveRoom);

  socket.on("disconnect", async (reason) => {
    common.playerLog("disconnected due to " + reason);
    if (!socket.player) return;

    const { name, roomId } = socket.player;
    const room = await Room.findById(roomId);
    if (room.status === "ended") return;

    socketLog(name + " disconnected due to " + reason);
    disconnect();
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log("attemptNumber", attemptNumber);
  });

  Object.assign(common, { emitPlayers, removePlayer });
};

export default connectionEvents;
