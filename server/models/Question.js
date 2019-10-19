import { Schema, model } from "mongoose";
import * as Player from "./Player";

const schema = new Schema(
  {
    text: String,
    type: {
      type: String,
      enum: ["mcq", "yesno", "players", "open"],
      default: "mcq"
    },
    options: {
      type: [String],
      default: undefined
    },
    number: Number,
    roomId: String,
    authorId: String,
    round: Number,
    status: {
      type: String,
      enum: ["unasked", "asking", "asked"],
      default: "unasked"
    },
    recipientId: String,
    correctAnswer: Number,
    answeredAt: Date,
    randomQuestionId: String
  },
  { versionKey: false }
);

const Question = model("Question", schema);

export const createMany = (questions, authorId, roomId) => {
  const promises = questions.map(
    ({ randomQuestionId, text, type, options }, number) => {
      const question = {
        text,
        type,
        options,
        number,
        roomId,
        authorId,
        status: "unasked"
      };
      if (randomQuestionId) Object.assign(question, { randomQuestionId });
      return Question.findOneAndUpdate({ number, roomId, authorId }, question, {
        upsert: true
      });
    }
  );
  return Promise.all(promises);
};

export const removeByPlayerId = authorId => Question.deleteMany({ authorId });

export const draw = async (roomId, round, currentRecipientId) => {
  // randomly get unasked
  const unasked = await Question.aggregate([
    [{ $match: { roomId, status: "unasked" } }, { $sample: { size: 1 } }]
  ]);
  // if has unasked
  if (unasked && unasked.length > 0) {
    const id = unasked[0]._id;
    // get next recipient
    const recipientId = await Player.getNextRecipientId(
      roomId,
      currentRecipientId
    );
    // set question status, recipient, round
    const drawn = await Question.findByIdAndUpdate(
      id,
      { status: "asking", recipientId, round },
      { new: true }
    );
    return drawn;
  } else {
    //   end game
    return false;
  }
};

export const getCurrentQuestionInRoom = roomId =>
  Question.findOne(
    { roomId, status: "asking" },
    { correctAnswer: 1, recipientId: 1 }
  ).lean();

export const setAnswer = (id, correctAnswer) =>
  Question.findByIdAndUpdate(
    id,
    { correctAnswer },
    {
      new: true,
      select: { correctAnswer: 1, recipientId: 1 }
    }
  ).lean();

export const complete = id =>
  Question.findByIdAndUpdate(
    id,
    { status: "asking" },
    {
      new: true,
      select: {
        correctAnswer: 1,
        options: 1,
        status: 1,
        round: 1
      }
    }
  ).lean();

// export const deleteById = id => Question.findByIdAndDelete(id);
