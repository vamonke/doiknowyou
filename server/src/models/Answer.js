import { Schema, model } from "mongoose";
import * as Player from "./Player";
import * as Question from "./Question";

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

export const hasEveryPlayerAnswered = async (
  roomId,
  questionId,
  recipientId
) => {
  let playerIds = await Player.findIdsByRoom(roomId);
  let answeredPlayerIds = await Answer.find(
    { questionId },
    { playerId: 1, _id: 0 }
  );

  playerIds = playerIds.map(({ _id }) => String(_id));
  answeredPlayerIds = answeredPlayerIds.map(({ playerId }) => String(playerId));

  if (answeredPlayerIds.length < playerIds.length - 1) {
    // more players than answers (excluding recipient)
    return false;
  }

  const allAnswered = playerIds
    .filter(id => id !== recipientId) // Recipient has no answer
    .every(id => answeredPlayerIds.includes(id));
  return allAnswered;
};

export const findByQuestion = questionId =>
  Answer.find({ questionId }).select({ option: 1, playerId: 1 });

// export const insertOpen = async (answer, questionId, playerId) => {
//   // Add option to question
//   const option = await Question.addOption(answer, questionId);
//   // Insert answer
//   await create(option, questionId, playerId);
//   return option;
// };

// export const getCorrectAnswers = (questionId, option, recipientId) => {
//   return Answer.find(
//     { questionId, option, playerId: { $ne: recipientId } },
//     { _id: 0, playerId: 1 }
//   );
// };
