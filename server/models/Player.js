import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    roomId: String,
    isReady: {
      type: Boolean,
      default: false
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
  return Player.find({ roomId }).select({ name: 1, isReady: 1 });
};

export const ready = id => {
  return Player.findByIdAndUpdate(id, { isReady: true });
}

export const notReady = id => {
  return Player.findByIdAndUpdate(id, { isReady: false });
}

export const leave = id => {
  return Player.findByIdAndDelete(id);
};
