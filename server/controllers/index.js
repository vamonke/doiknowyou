import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as RandomQuestion from "../models/RandomQuestion";
// import { gameLog, playerLog } from "../logger";

export const createGame = async playerName => {
  const room = await Room.create();
  const viewer = await Player.create(room._id, playerName);
  const res = { room, viewer };
  return res;
};

export const joinGame = async (playerName, roomNo) => {
  const room = await Room.findByNumber(roomNo);
  if (room) {
    const viewer = await Player.create(room._id, playerName);
    const res = { room, viewer };
    return res;
  }
  return false;
};

export const populateQuestionBank = RandomQuestion.populate;
export const getQuestionBank = RandomQuestion.getAll;
