import { Schema, model } from "mongoose";
import * as Player from "./Player";

const generateRoomNo = () => Math.floor(1000 + Math.random() * 9000);

const schema = new Schema(
  {
    number: {
      type: Number,
      unique: true
    },
    status: {
      type: String,
      enum: ["created", "started", "ended"],
      default: "created"
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "Player"
    },
    timeLimit: {
      type: Number,
      default: 0
    },
    gameMode: {
      type: String,
      enum: ["random", "custom"],
      default: "random"
    },
    nextRoomNo: Number,
    createdAt: Date,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "Player"
    },
    endedAt: Date
  },
  { versionKey: false }
);

const Room = model("Room", schema);

export const create = () => {
  // console.log("MongoDB: Creating room");
  const number = generateRoomNo();
  return Room.create({ number, createdAt: Date.now() })
    .then(room => {
      console.log("MongoDB: Room created - " + room.number);
      return room;
    })
    .catch(error => {
      if (error.code === 11000) {
        console.log("MongoDB: Room number conflict: " + number);
        // TODO: Use latest room instead of a new room
        return create();
      } else {
        throw error;
      }
    });
};

export const findById = id => Room.findById(id).lean();

export const findByNumber = roomNo => Room.findOne({ number: roomNo }).lean();
// {
// return Room.findOne({ number: roomNo })
//   .then(room => {
//     if (room) {
//       console.log("MongoDB: Room found - " + room.number);
//       return room;
//     }
//     console.log("MongoDB: Room not found - " + roomNo);
//     return false;
//   })
//   .catch(error => {
//     console.error(error);
//   });
// };

export const getPlayerCount = Player.findCountByRoom;

export const isEveryPlayerReady = async id => {
  const players = await Player.findByRoom(id);
  return players.length > 1 && players.every(player => player.isReady);
};

export const start = id => {
  return Room.findByIdAndUpdate(id, { status: "started" }, { new: true });
};

export const gameOver = (id, nextRoomNo) =>
  Room.findByIdAndUpdate(
    id,
    { status: "ended", nextRoomNo, endedAt: Date.now() },
    { new: true }
  );

export const updateTimeLimit = (id, timeLimit) =>
  Room.findByIdAndUpdate(id, { timeLimit }, { new: true });

export const updateGameMode = (id, gameMode) =>
  Room.findByIdAndUpdate(id, { gameMode }, { new: true });

export const updateHost = (id, hostId) =>
  Room.findByIdAndUpdate(id, { hostId }, { new: true });

export const getTimeLimit = id =>
  Room.findById(id)
    .select({ timeLimit: 1 })
    .lean();

export const getAll = () =>
  Room.aggregate()
    .sort({ createdAt: "desc" })
    .lookup({ from: 'players', localField: 'hostId', foreignField: '_id', as: 'host' })
    .lookup({ from: 'players', localField: 'creatorId', foreignField: '_id', as: 'creator' })
    .unwind({
      path: "$host",
      preserveNullAndEmptyArrays: true
    })
    .unwind({
      path: "$creator",
      preserveNullAndEmptyArrays: true
    })
    .project({
      status: 1,
      timeLimit: 1,
      number: 1,
      createdAt: 1,
      'creator._id': 1,
      'creator.name': 1,
      'host._id': 1,
      'host.name': 1,
    })
    ;
  ;
  // Room.find({})
  //   .sort({ createdAt: "desc" })
  //   .populate("hostId", { name: 1, _id: 1 })
  //   .populate("creatorId", { name: 1, _id: 1 })
  //   .lean();
