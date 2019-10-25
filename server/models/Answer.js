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

export const hasEveryPlayerAnswered = async (
  roomId,
  questionId,
  recipientId
) => {
  const playerIds = await Player.findIdsByRoom(roomId);
  const answeredPlayerIds = await Answer.find(
    { questionId },
    { playerId: 1, _id: 0 },
    { sort: { playerId: 1 } }
  );

  if (answeredPlayerIds.length < playerIds.length - 1) {
    // number of answers and players match
    return false;
  }

  const allAnswered = playerIds
    .map(({ _id }) => _id.toString())
    .filter(id => id !== recipientId)
    .every((id, i) => id === answeredPlayerIds[i].playerId);
  return allAnswered;
};

export const findByQuestion = questionId =>
  Answer.find({ questionId }).select({ option: 1, playerId: 1 });

export const insertOpen = async (submission, questionId, playerId) => {
  // Add option to question
  const option = await Question.addOption(questionId, submission);
  // Insert answer
  await create(option, questionId, playerId);
  return option;
};

// export const getCorrectAnswers = (questionId, option, recipientId) => {
//   return Answer.find(
//     { questionId, option, playerId: { $ne: recipientId } },
//     { _id: 0, playerId: 1 }
//   );
// };
