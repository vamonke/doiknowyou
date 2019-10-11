import * as Room from "../models/Room";
import * as Player from "../models/Player";
// import { gameLog, playerLog } from "../logger";

export const createGame = async playerName => {
  const room = await Room.create();
  const viewer = await Player.create(room._id, playerName);
  const res = { room, viewer };
  return res;
};

export const joinGame = async (playerName, roomNo) => {
  const room = await Room.findByNumber(roomNo); 
  const viewer = await Player.create(room._id, playerName);
  const res = { room, viewer };
  return res;
};
