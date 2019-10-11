import { Schema, model } from "mongoose";
import * as Player from "./Player";

const generateRoomNo = () => Math.floor(1000 + Math.random() * 9000);

const schema = new Schema(
  {
    number: {
      type: Number,
      unique: true
    }
  },
  { versionKey: false }
);

const Room = model("Room", schema);

export const create = () => {
  // console.log("MongoDB: Creating room");
  const number = generateRoomNo();
  return Room.create({ number })
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

export const findByNumber = (roomNo) => {
  return Room.findOne({ number: roomNo }).exec()
    .then(room => {
      console.log("MongoDB: Room found - " + room.number);
      return room;
    })
    .catch(error => {
        console.error(error);
    });
}

export const getPlayers = Player.findByRoom;
