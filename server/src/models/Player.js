import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    roomId: String,
    isReady: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    disconnected: {
      type: Boolean,
      default: false
    },
    createdAt: Date,
  },
  { versionKey: false }
);

const Player = model("Player", schema);

export const create = async (roomId, name) => {
  const player = await Player.create({ name, roomId });
  console.log("MongoDB: Player created - " + player.name);
  return player;
};

export const findById = id => Player.findById(id).lean();

export const findByRoom = roomId =>
  Player.find({ roomId }).select({ name: 1, isReady: 1, score: 1, disconnected: 1 });

export const countByRoomId = roomId => Player.countDocuments({ roomId });

export const findIdsByRoom = roomId => Player.find({ roomId }).select({ _id: 1 });

export const ready = id => Player.findByIdAndUpdate(id, { isReady: true });

export const notReady = id => Player.findByIdAndUpdate(id, { isReady: false });

export const remove = id => Player.findByIdAndDelete(id);

export const disconnect = id => Player.findByIdAndUpdate(id, { disconnected: true });

export const connected = id => Player.findByIdAndUpdate(id, { disconnected: false });

export const getNextRecipientId = async (roomId, currentRecipientId) => {
  let next;
  if (currentRecipientId) {
    next = await Player.findOne({
      roomId,
      disconnected: false,
      _id: { $gt: currentRecipientId }
    }, "_id", { sort: { _id: 1 } });
  }
  if (!next) {
    next = await Player.findOne({ roomId, disconnected: false }, "_id");
  }
  return next ? next._id : null;
};

export const addScore = id =>
  Player.findByIdAndUpdate(
    id,
    { $inc: { score: 1 } },
    { new: true, select: { name: 1, roomId: 1, score: 1 } }
  );
