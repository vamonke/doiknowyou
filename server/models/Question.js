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
    asked: {
      type: Boolean,
      default: false
    },
    recipientId: String,
    correctAnswer: String,
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
        asked: false
      };
      if (randomQuestionId) Object.assign(question, { randomQuestionId });
      return Question.findOneAndUpdate(
        {
          number,
          roomId,
          authorId
        },
        question,
        { upsert: true }
      );
    }
  );
  return Promise.all(promises);
};

export const removeByPlayerId = authorId => Question.deleteMany({ authorId });

export const draw = async (roomId, round, currentRecipientId) => {
  // randomly get unasked
  let question = await Question.aggregate([
    [
      { $match: { roomId, asked: false } },
      { $sample: { size: 1 } }
    ]
  ]);
  // if has unasked
  if (question.length > 0) {
    const id = question[0]._id;
    // get next recipient
    const recipientId = await Player.getNextRecipient(roomId, currentRecipientId);
    // set question status, recipient, round
    const drawn = await Question.findByIdAndUpdate(id, {
      asked: true,
      recipientId,
      round
    }, {
      select: "_id",
      lean: true
    });
    return drawn._id;
  }
  // else
  //   end game
};

// export const getAll = () => Question.find().select({ usage: 0 });

// export const deleteById = id => Question.findByIdAndDelete(id);
