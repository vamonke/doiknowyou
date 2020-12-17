import * as Room from "../models/Room";
import * as Player from "../models/Player";
import * as RandomQuestion from "../models/RandomQuestion";

export * from "./admin";

export const createGame = async playerName => {
  const room = await Room.create();
  const viewer = await Player.create(room._id, playerName);
  room.hostId = viewer._id;
  room.creatorId = viewer._id;
  await room.save();
  const res = { room, viewer };
  return res;
};

export const joinGame = async (playerName, roomNo) => {
  let room = await Room.findByNumber(roomNo);
  if (!room) return false;

  const { hostId, _id: roomId } = room;
  const viewer = await Player.create(roomId, playerName);

  const hostIsActive = await isHostActive(hostId);
  if (!hostIsActive) {
    room = await setNewHost(roomId, null);
  }

  const res = { room, viewer };
  return res;
};

const isHostActive = async hostId => {
  if (!hostId) return false;
  const host = await Player.findById(hostId);
  console.log('host', host);
  if (!host) return false;
  const { disconnected } = host;
  console.log('disconnected', disconnected);
  return !disconnected;
}

const setNewHost = async (roomId) => {
  const newHostId = await Player.getNextRecipientId(roomId);
  console.log('newHostId', newHostId);
  const room = await Room.updateHost(roomId, newHostId);
  console.log('room', room);
  return room;
};

export const getQuestionBank = RandomQuestion.getAllowed;
