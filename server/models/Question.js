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
    correctAnswer: {
      type: [Number],
      default: []
    },
    answeredAt: Date,
    randomQuestionId: String,
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer"
      }
    ]
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

export const setCorrectAnswer = (id, correctAnswer) =>
  Question.findByIdAndUpdate(
    id,
    { correctAnswer },
    {
      new: true,
      select: { correctAnswer: 1, recipientId: 1 }
    }
  ).lean();

export const complete = (id, answers) =>
  Question.findByIdAndUpdate(
    id,
    { status: "asked", answers },
    {
      new: true,
      select: {
        text: 1,
        type: 1,
        options: 1,
        round: 1,
        status: 1,
        recipientId: 1,
        correctAnswer: 1,
        answers: 1,
      }
    }
  )
    .populate("answers", { option: 1, playerId: 1 })
    .lean();

export const findAsked = roomId =>
  Question.find({ roomId, status: "asked" })
    .select({
      text: 1,
      type: 1,
      options: 1,
      round: 1,
      status: 1,
      recipientId: 1,
      correctAnswer: 1,
      answers: 1,
    })
    .sort({ round: "desc" })
    .populate("answers", { option: 1, playerId: 1 })
    .lean();

// export const deleteById = id => Question.findByIdAndDelete(id);
