import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as Question from "../models/Question";
import * as RandomQuestion from "../models/RandomQuestion";

export const getRoom = async roomId => {
  const room = await Room.findById(roomId);
  const players = await Player.findByRoom(roomId);
  const questions = await Question.findbyRoomId(roomId);

  // const hostId = room.hostId;
  // const host = players.find(player => player._id.toString() == hostId);
  // if (host) room.hostId = host;
  room.players = players;
  room.questions = questions;

  return room;
};

export const getRooms = Room.getAll;

export const toggleQuestion = RandomQuestion.toggleDisabled;
export const populateQuestionBank = RandomQuestion.populate;
export const getQuestionBankAll = RandomQuestion.getAll;