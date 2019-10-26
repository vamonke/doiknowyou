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
    }
  },
  { versionKey: false }
);

const Player = model("Player", schema);

export const create = (roomId, name) => {
  // console.log("MongoDB: Creating player");
  return Player.create({ name, roomId }).then(player => {
    console.log("MongoDB: Player created - " + player.name);
    return player;
  });
};

export const findByRoom = roomId => {
  return Player.find({ roomId }).select({ name: 1, isReady: 1, score: 1 });
};

export const findIdsByRoom = roomId => {
  return Player.find({ roomId })
    .select({ _id: 1 })
    .sort({ _id: 1 });
};

export const ready = id => Player.findByIdAndUpdate(id, { isReady: true });

export const notReady = id => Player.findByIdAndUpdate(id, { isReady: false });

export const remove = id => Player.findByIdAndDelete(id);

export const getNextRecipientId = async (roomId, currentRecipientId) => {
  let next;
  if (currentRecipientId) {
    next = await Player.findOne({
      roomId,
      _id: { $gt: currentRecipientId }
    }, "_id", { sort: { _id: 1 } });
  }
  if (!next) {
    next = await Player.findOne({ roomId }, "_id");
  }
  return next._id;
};

export const addScore = id =>
  Player.findByIdAndUpdate(
    id,
    { $inc: { score: 1 } },
    { new: true, select: { name: 1, roomId: 1, score: 1 } }
  );
