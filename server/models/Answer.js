import { Schema, model } from "mongoose";
import * as Player from "./Player";

const schema = new Schema(
  {
    questionId: String,
    playerId: String,
    option: Number,
    createdAt: Date
  },
  { versionKey: false }
);

const Answer = model("Answer", schema);

export const create = (option, questionId, playerId) => {
  const answer = {
    option,
    questionId,
    playerId,
    createdAt: Date.now()
  };
  return Answer.findOneAndUpdate(
    {
      questionId,
      playerId
    },
    answer,
    { upsert: true }
  );
};

export const hasEveryPlayerAnswered = async (roomId, questionId) => {
  const playerIds = await Player.findIdsByRoom(roomId);
  const answeredPlayerIds = await Answer.find(
    { questionId },
    { playerId: 1, _id: 0 },
    { sort: { playerId: 1 } }
  );
  const allAnswered =
    answeredPlayerIds.length === playerIds.length && // number of answers and players match
    playerIds.every(
      ({ _id }, i) => _id.toString() === answeredPlayerIds[i].playerId // every id matches
    );
  return allAnswered;
};

export const findByQuestion = questionId =>
  Answer.find({ questionId }).select({ option: 1, playerId: 1 });

// export const getCorrectAnswers = (questionId, option, recipientId) => {
//   return Answer.find(
//     { questionId, option, playerId: { $ne: recipientId } },
//     { _id: 0, playerId: 1 }
//   );
// };
