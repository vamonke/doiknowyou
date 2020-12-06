import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as RandomQuestion from "../models/RandomQuestion";

// TODO: Authenticate host by player id
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

    const { timeLimit, gameMode } = settings;
    const { player: { roomId } } = socket;

    let room;

    // Host: Update time limit
    if (timeLimit || timeLimit === 0) {
      room = await Room.updateTimeLimit(roomId, timeLimit);
      common.gameLog("Updated question time limit - " + timeLimit);
      io.to(roomId).emit("newSettings", { room });
    }

    // Update game mode
    if (gameMode) {
      room = await Room.updateGameMode(roomId, gameMode);
      common.gameLog("Updated game mode - " + gameMode);
      io.to(roomId).emit("newSettings", { room });
    }

    // Emit updated settings
    if (room) {
      io.to(roomId).emit("newSettings", { room });
    }
  });

  // Host: Start random game
  socket.on("startRandomGame", async () => {
    if (socket.missingPlayer()) return;

    const { roomId, _id: playerId } = socket.player;
    
    // Remove any existing questions
    await Question.removeByRoomId(roomId);
    
    // Select random questions
    const QUESTIONS_COUNT = 2; // TODO: Should come from db
    const rounds = QUESTIONS_COUNT;
    const playerCount = await Room.getPlayerCount(roomId);
    const questionCount = playerCount * rounds;
    const randomQuestions = await RandomQuestion.getMany(questionCount);

    randomQuestions.forEach(question => {
      question.randomQuestionId = question._id;
      if (question.type === "yesno") question.options = ["Yes", "No"]
    });

    // Insert questions to room
    await Question.createMany(
      randomQuestions,
      playerId,
      roomId
    );

    common.startGame(roomId);
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